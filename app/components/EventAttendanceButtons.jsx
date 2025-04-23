import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import {
  getEventAttendance,
  patchEventAttendance,
  postEventAttendance,
  updateEventStatus,
} from '../services/eventsAPI';

import { Alert, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';



import { updateEvent } from '../api';

export const EventAttendanceButtons = ({ event, setStatus }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [eventAttendance, setEventAttendance] = useState([]);
  const [optimisticAttendance, setOptimisticAttendance] = useState(null);
  const [eventStatus, setEventStatus] = useState(event);

  const { user } = useContext(UserContext);

  // Add check for user loading state
  if (!user) {
    return (
      <View style={styles.attendanceButtons}>
        <ActivityIndicator size="large" color="#669BBC" />
      </View>
    );
  }

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!event?.event_id) return;
      
      try {
        const res = await getEventAttendance(event.event_id);
        console.log('getEventAttendance response:', res);
        setEventAttendance(res || []);
        const hasApprovedAttendee = res.some(
          (att) => att.event_id === event.event_id && att.user_status === 'APPROVED'
        );
        console.log(`hasApproved for ${event.event_id}:`, hasApprovedAttendee);

        const newStatus = hasApprovedAttendee ? 'INACTIVE' : 'ACTIVE';

        console.log(`newStatus for ${event.event_id}:`, newStatus);

        if (event.status !== newStatus) {
          await updateEventStatus(event.event_id, { status: newStatus });
          setEventStatus((prev) => ({ ...prev, status: newStatus }));

        console.log(`Setting status for ${event.status}:`);



      } catch (error) {
        setIsError(error);
        Alert.alert('Error', 'The event attendance could not be loaded.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAttendance();

  }, [event?.event_id]);



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
      console.log('existingRequest:', existingRequest);

      if (existingRequest && existingRequest.user_status === 'CANCELLED') {
        const res = await patchEventAttendance({
          ...existingRequest,
          user_status: 'REQUESTED',
          user_approved: false,
        });
        console.log('patch from CANCELLED state:', res);
        setEventAttendance((prev) =>
          prev.map((attendance) =>
            attendance.attendee_id === user.user_id && attendance.event_id === eventId
              ? res
              : attendance
          )
        );
      } else if (!existingRequest) {
        const res = await postEventAttendance(attendanceRequest);
        console.log('post response:', res);
        setEventAttendance((prev) => [...prev, res]);
      }
    } catch (error) {
      setIsError(error);
      setOptimisticAttendance(null);
      setIsDisabled(false);
      Alert.alert('Error', 'Attendance could not be recorded');
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  const handleCancelation = async () => {
    setIsLoading(true);
    setIsError(null);
    setIsDisabled(true);

    setOptimisticAttendance(null);
    setEventAttendance((prev) =>
      prev.filter(
        (attendance) =>
          !(attendance.attendee_id === user.user_id && attendance.event_id === event.event_id)
      )
    );

    try {
      const res = await patchEventAttendance({
        event_id: event.event_id,
        attendee_id: user.user_id,
        user_status: 'CANCELLED',
        user_approved: false,
      });
      console.log('patch from REQUESTED state:', res);

      // Update event status after cancellation
      await updateEvent(event.event_id, { status: 'ACTIVE' });
      if (setStatus) {
        setStatus(true);
      }
    } catch (error) {
      setIsError(error);
      Alert.alert('Error', 'Attendance could not be canceled.');
      const res = await getEventAttendance(event.event_id);
      console.log('getEventAttendance after error:', res);
      setEventAttendance(res);
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
    try {
      await updateEvent(event.event_id, { status: 'ACTIVE' });
      setStatus(true);
    } catch (error) {
      setIsError(error);
      Alert.alert('Error', 'Event still inactive.');
    }
  };

  const isRequested =
    (optimisticAttendance?.event_id === event.event_id &&
      optimisticAttendance?.attendee_id === user.user_id &&
      optimisticAttendance?.user_status === 'REQUESTED') ||
    eventAttendance.some(
      (attendance) =>
        attendance.attendee_id === user.user_id &&
        attendance.event_id === event.event_id &&
        attendance.user_status === 'REQUESTED'
    );
    
  console.log('isDisabled:', isDisabled);
  console.log('isRequested:', isRequested);
  console.log('eventAttendance:', eventAttendance);

  const isApproved = eventAttendance.some(
    (attendance) =>
      attendance.attendee_id === user.user_id &&
      attendance.event_id === event.event_id &&
      attendance.user_status === 'APPROVED'
  );

  const isOccupied = eventAttendance.some(
    (attendance) =>
      attendance.attendee_id !== user.user_id &&
      attendance.event_id === event.event_id &&
      attendance.user_status === 'APPROVED'
  );

  console.log('isApproved:', isApproved);
  console.log('isOccuoies:', isOccupied);
    
  return (
    <View style={styles.attendanceButtons}>
      <TouchableOpacity
        onPress={() => handleAttendance(event.event_id)}
        disabled={isRequested || isOccupied || isApproved}
        style={[styles.button, isRequested ? styles.disabledButton : styles.attendButton]}

        accessibilityLabel={`Assist ${event.event_id}`}>


        <Text style={styles.buttonText}>
          {isRequested
            ? 'Request sent'
            : isApproved
              ? 'Approved'
              : isOccupied
                ? 'Occupied'
                : 'Attend'}
        </Text>
      </TouchableOpacity>
      {(isRequested || isApproved) && (
        <TouchableOpacity
          onPress={handleCancelation}
          style={[styles.button, styles.cancelButton]}
          accessibilityLabel={`Cancel event attendance ${event.event_id}`}>
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
