import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { getEventUserActivity, updateEventUserActivityStatus, getUserById } from '../api';

export default function HostedEventCard({ event }) {
  const [eventActivity, setEventActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
                lastName: user.last_name
              };
            } catch (err) {
              console.error(`Error fetching user ${request.attendee_id}:`, err);
              return {
                ...request,
                firstName: 'Unknown',
                lastName: 'User'
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
  }, [event.event_id]);

  const handleApproveRequest = async (attendee_id) => {
    try {
      await updateEventUserActivityStatus(event.event_id, attendee_id, 'APPROVED', true);
      setEventActivity(eventActivity.map(activity => 
        activity.attendee_id === attendee_id 
          ? { ...activity, user_status: 'APPROVED', user_approved: true }
          : activity
      ));
    } catch (err) {
      console.error('Error approving request:', err);
    }
  };

  const handleDeclineRequest = async (attendee_id) => {
    try {
      await updateEventUserActivityStatus(event.event_id, attendee_id, 'CANCELLED', false);
      setEventActivity(eventActivity.map(activity => 
        activity.attendee_id === attendee_id 
          ? { ...activity, user_status: 'CANCELLED', user_approved: false }
          : activity
      ));
    } catch (err) {
      console.error('Error declining request:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit'
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

  const pendingRequests = eventActivity.filter(activity => activity.user_status === 'REQUESTED');
  const approvedAttendees = eventActivity.filter(activity => activity.user_status === 'APPROVED');

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
        {pendingRequests.length > 0 && (
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingBadgeText}>
              {pendingRequests.length} pending
            </Text>
          </View>
        )}
      </View>

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
                    onPress={() => handleApproveRequest(activity.attendee_id)}
                  >
                    <Text style={styles.buttonText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.requestButton, styles.declineButton]}
                    onPress={() => handleDeclineRequest(activity.attendee_id)}
                  >
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
});
