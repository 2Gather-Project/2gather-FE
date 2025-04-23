import { Text, View, Image, StyleSheet } from 'react-native';

export default function HostProfileCard({ user }) {
  return (
    <View style={styles.card}>
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: user.image_url || 'https://via.placeholder.com/200x200.png?text=No+Image',
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {user.first_name} {user.last_name}
        </Text>
        <Text style={styles.role}>{user.job_title}</Text>
        <Text style={styles.bio}>"{user.bio}"</Text>
        <Text style={styles.detail}>Gender: {user.gender}</Text>
        <Text style={styles.detail}>Personality: {user.personality}</Text>
        <Text style={styles.detail}>Tea or Coffee? {user.coffee_tea}</Text>
        <Text style={styles.detail}>Favourite Food: {user.fav_food}</Text>
        <Text style={styles.detail}>Reason for being here: {user.reason || '2Gather'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 20,
    marginHorizontal: 16,
  },
  profileImageContainer: {
    width: 206,
    height: 206,
    borderRadius: 100,
    borderColor: '#003049',
    borderWidth: 1,
    padding: 4,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 6,
  },
  role: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C1121F',
    marginBottom: 8,
  },
  bio: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#003049',
    marginBottom: 10,
    textAlign: 'center',
  },
  detail: {
    fontSize: 14,
    color: '#003049',
    marginVertical: 2,
  },
});
