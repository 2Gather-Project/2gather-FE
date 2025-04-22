import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getEventUserActivity, getUserById, getEventById } from '../api';

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [eventUserActivity, setEventUserActivity] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch event details
        const eventData = await getEventById(id);
        setEvent(eventData);

        // Fetch event user activity
        const response = await getEventUserActivity(id);
        
        // Add usernames to each request
        const requestsWithUsernames = await Promise.all(
          response.map(async (request) => {
            try {
              const user = await getUserById(request.attendee_id);
              console.log('user', user);
              return { ...request, firstName: user.first_name, lastName: user.last_name };
            } catch (err) {
              console.error(`Error fetching user ${request.attendee_id}:`, err);
              return { ...request, firstName: `User ${request.attendee_id}`, lastName: `User ${request.attendee_id}` };
            }
          })
        );

        setEventUserActivity(requestsWithUsernames || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
        setEventUserActivity([]);
      }
    };

    fetchData();
  }, [id]);

  const pendingRequests = eventUserActivity?.filter(r => r.user_status === 'REQUESTED')?.length || 0;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: "Event Details",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#003049" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading event details...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>{event.title}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {pendingRequests} pending
                </Text>
              </View>
            </View>

            <View style={styles.details}>
              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.detailText}>
                  {new Date(event.event_date).toLocaleDateString()} - {new Date(event.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
              
              <View style={styles.detailRow}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{event.location}</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="pricetag-outline" size={16} color="#666" />
                <Text style={styles.detailText}>Category: {event.category}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{event.description}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Requests</Text>
              {eventUserActivity.map((request) => (
                <View key={request.id} style={styles.requestCard}>
                  <View style={styles.requestHeader}>
                    <Text style={styles.userName}>{request.firstName} {request.lastName}</Text>
                    <View style={[styles.statusBadge, 
                      { backgroundColor: request.user_status === 'APPROVED' ? '#4CAF50' : '#FFA07A' }
                    ]}>
                      <Text style={styles.statusText}>{request.user_status}</Text>
                    </View>
                  </View>
                  {request.user_status === 'REQUESTED' && (
                    <View style={styles.actions}>
                      <TouchableOpacity style={[styles.actionButton, styles.approveButton]}>
                        <Text style={styles.actionButtonText}>Approve</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.actionButton, styles.declineButton]}>
                        <Text style={[styles.actionButtonText, styles.declineText]}>Decline</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#003049',
    flex: 1,
  },
  badge: {
    backgroundColor: '#FFA07A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  details: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 24,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003049',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  requestCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#003049',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#003049',
  },
  declineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#003049',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  declineText: {
    color: '#003049',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
}); 