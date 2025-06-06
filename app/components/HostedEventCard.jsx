import { StyleSheet, View, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import {
  getEventUserActivity,
  updateEventUserActivityStatus,
  getUserById,
  updateEvent,
  deleteEvent,
} from '../api';
import { useRouter } from 'expo-router';

export default function HostedEventCard({ event, setDeletedEvent }) {
  const router = useRouter();
  const [eventActivity, setEventActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasApprovedDeclined, setHasApprovedDeclined] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setHasApprovedDeclined(false);
    const fetchEventActivity = async () => {
      try {
        const activity = await getEventUserActivity(event.event_id);

        // If activity is empty, set empty array and return
        if (!activity || activity.length === 0) {
          setEventActivity([]);
          setIsLoading(false);
          return;
        }

        // Fetch user details for each request
        const activityWithUserDetails = await Promise.all(
          activity.map(async (request) => {
            try {
              const user = await getUserById(request.attendee_id);
              return {
                ...request,
                firstName: user.first_name,
                lastName: user.last_name,
              };
            } catch (err) {
              console.error(`Error fetching user ${request.attendee_id}:`, err);
              return {
                ...request,
                firstName: 'Unknown',
                lastName: 'User',
              };
            }
          })
        );

        setEventActivity(activityWithUserDetails);
      } catch (err) {
        console.error('Error fetching event activity:', err);
        setEventActivity([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventActivity();
  }, [hasApprovedDeclined, event.event_id, event.user_status]);

  const handleApproveRequest = async (attendee_id) => {
    try {
      // Update the user's status to approved
      await updateEventUserActivityStatus(event.event_id, attendee_id, 'APPROVED', true);

      // Update the event status to inactive
      await updateEvent(event.event_id, { status: 'INACTIVE' });

      setEventActivity(
        eventActivity.map((activity) =>
          activity.attendee_id === attendee_id
            ? { ...activity, user_status: 'APPROVED', user_approved: true }
            : activity
        )
      );
    } catch (err) {
      console.error('Error approving request:', err);
    }
    setHasApprovedDeclined(true);
  };

  const handleDeclineRequest = async (attendee_id) => {
    try {
      await updateEventUserActivityStatus(event.event_id, attendee_id, 'CANCELLED', false);
      setEventActivity(
        eventActivity.map((activity) =>
          activity.attendee_id === attendee_id
            ? { ...activity, user_status: 'CANCELLED', user_approved: false }
            : activity
        )
      );
    } catch (err) {
      console.error('Error declining request:', err);
    }
    setHasApprovedDeclined(true);
  };

  const handleDeleteEvent = () => {
    console.log('pressed delete');

    async () => {
      try {
        await deleteEvent(event.event_id);
        router.back();
      } catch (err) {
        console.error('Error deleting event:', err);
        Alert.alert('Error', 'Failed to delete event. Please try again.');
      }
    };
    deleteEvent(event.event_id);
    setDeletedEvent(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'APPROVED':
        return styles.approvedBadge;
      case 'CANCELLED':
        return styles.cancelledBadge;
      default:
        return styles.pendingBadge;
    }
  };

  const getStatusBadgeTextStyle = (status) => {
    switch (status) {
      case 'APPROVED':
        return styles.approvedBadgeText;
      case 'CANCELLED':
        return styles.cancelledBadgeText;
      default:
        return styles.pendingBadgeText;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.card}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const pendingRequests = eventActivity.filter((activity) => activity.user_status === 'REQUESTED');
  const approvedAttendees = eventActivity.filter((activity) => activity.user_status === 'APPROVED');

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{event.title}</Text>
          <View style={styles.attendeesCount}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={styles.attendeesText}>{approvedAttendees.length} attendees</Text>
          </View>
        </View>
        <View style={styles.headerButtons}>
          {pendingRequests.length > 0 && (
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingBadgeText}>{pendingRequests.length} pending</Text>
            </View>
          )}
          <TouchableOpacity style={styles.deleteButton} onPress={() => setShowDeleteModal(true)}>
            <Ionicons name="trash-outline" size={20} color="#F44336" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Event</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this event? This action cannot be undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowDeleteModal(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteConfirmButton]}
                onPress={handleDeleteEvent}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.detailText}>
            {formatDate(event.event_date)} - {formatTime(event.event_date)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{event.location}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="pricetag-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{event.category}</Text>
        </View>
      </View>

      {eventActivity.length > 0 && (
        <View style={styles.requestsContainer}>
          <Text style={styles.requestsTitle}>Requests</Text>
          {eventActivity.map((activity) => (
            <View key={activity.id} style={styles.requestItem}>
              <View style={styles.requestInfo}>
                <Text style={styles.requestName}>
                  {activity.firstName} {activity.lastName}
                </Text>
                <View style={getStatusBadgeStyle(activity.user_status)}>
                  <Text style={getStatusBadgeTextStyle(activity.user_status)}>
                    {activity.user_status}
                  </Text>
                </View>
              </View>
              {activity.user_status === 'REQUESTED' && (
                <View style={styles.requestButtons}>
                  <TouchableOpacity
                    style={[styles.requestButton, styles.approveButton]}
                    onPress={() => handleApproveRequest(activity.attendee_id)}>
                    <Text style={styles.buttonText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.requestButton, styles.declineButton]}
                    onPress={() => handleDeclineRequest(activity.attendee_id)}>
                    <Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  attendeesCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  attendeesText: {
    fontSize: 14,
    color: '#666',
  },
  details: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#666',
    fontSize: 14,
  },
  requestsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  requestsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  requestItem: {
    marginBottom: 12,
  },
  requestInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  requestName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  requestButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  requestButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    flex: 1,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  declineButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  pendingBadge: {
    backgroundColor: '#FFA07A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pendingBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  approvedBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  approvedBadgeText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  cancelledBadge: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cancelledBadgeText: {
    color: '#F44336',
    fontSize: 12,
    fontWeight: '600',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deleteButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  deleteConfirmButton: {
    backgroundColor: '#F44336',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
