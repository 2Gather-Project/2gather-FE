import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { getEventAttendance, patchEventAttendance, postEventAttendance } from '../services/eventsAPI';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const EventAttendanceButtons = ({ event }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [eventAttendance, setEventAttendance] = useState([]);
  const [optimisticAttendance, setOptimisticAttendance] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await getEventAttendance(event.event_id);
        setEventAttendance(res);
      } catch (error) {
        setIsError(error);
        Alert.alert('Error', 'No se pudo cargar la asistencia al evento.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAttendance();
  }, [event.event_id]);

  const handleAttendance = async (eventId) => {
    setIsLoading(true);
    setIsError(null);
    setIsDisabled(true);

    const attendanceRequest = {
      event_id: eventId,
      host_id: event.host_id,
      attendee_id: user.user_id,
      user_status: 'REQUESTED',
      user_approved: false,
    };

    setOptimisticAttendance(attendanceRequest);

    try {
        const existingRequest = eventAttendance.find(
            (attendance) => attendance.attendee_id === user.user_id && attendance.event_id === eventId
          );

      if (existingRequest && existingRequest.user_status === 'CANCELLED') {
        const res = await patchEventAttendance(attendanceRequest);
        setEventAttendance((prev) =>
          prev.map((attendance) =>
            attendance.attendee_id === user.user_id && attendance.event_id === eventId ? res : attendance
          )
        );
      } else if (!existingRequest) {
        const res = await postEventAttendance(attendanceRequest);
        setEventAttendance((prev) => [...prev, res]);
      }
    } catch (error) {
      setIsError(error);
      setOptimisticAttendance(null);
      setIsDisabled(false);
      Alert.alert('Error', 'No se pudo registrar la asistencia.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelation = async () => {
    setIsLoading(true);
    setIsError(null);
    setIsDisabled(true);

    setOptimisticAttendance(null);
    setEventAttendance((prev) =>
        prev.filter(
          (attendance) => !(attendance.attendee_id === user.user_id && attendance.event_id === event.event_id)
        )
      );
    try {
      await patchEventAttendance({
        event_id: event.event_id,
        attendee_id: user.user_id,
        user_status: 'CANCELLED',
        user_approved: false,
      });
    } catch (error) {
      setIsError(error);
      Alert.alert('Error', 'No se pudo cancelar la asistencia.');
      const res = await getEventAttendance(event.event_id);
      setEventAttendance(res);
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  const isRequested =
    optimisticAttendance?.user_status === 'REQUESTED' ||
    eventAttendance.some(
      (attendance) =>
        attendance.attendee_id === user.user_id && 
      attendance.event_id === event.event_id &&
        attendance.user_status === 'REQUESTED'
    );

  return (
    <View style={styles.attendanceButtons}>
      <TouchableOpacity
        onPress={() => handleAttendance(event.event_id)}
        disabled={isDisabled || isRequested}
        style={[styles.button, isRequested ? styles.disabledButton : styles.attendButton]}
        accessibilityLabel={`Asistir al evento ${event.event_id}`}
      >
        <Text style={styles.buttonText}>{isRequested ? 'Request sent' : 'Attend'}</Text>
      </TouchableOpacity>
      {isRequested && (
        <TouchableOpacity
          onPress={handleCancelation}
          style={[styles.button, styles.cancelButton]}
          accessibilityLabel={`Cancelar asistencia al evento ${event.event_id}`}
        >
          <Text style={styles.buttonText}>Cancel Attendance</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  attendanceButtons: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  button: {
    width: '50%',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  attendButton: {
    backgroundColor: '#28A745',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  cancelButton: {
    backgroundColor: '#DC3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});