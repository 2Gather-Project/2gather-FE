import { Text, View, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

export default function HostProfileCard({ user }) {
  console.log(user, '<<<');
  return (
    <>
      <View style={styles.container}>
        <View>
          <Image style={styles.imageContainer} source={{ uri: user.image_url }} />
          {/* image doesnt load TODO */}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {user.first_name} {user.last_name}
          </Text>
          <Text style={styles.description}>{user.gender}</Text>
          <Text style={styles.description}>Job Title: {user.job_title}</Text>
          <Text style={styles.description}>Bio: {user.bio}</Text>
          <Text style={styles.description}>Personality: {user.personality}</Text>
          <Text style={styles.description}>Tea or Coffee? {user.coffee_tea}</Text>
          <Text style={styles.description}>Favourite Food: {user.fav_food}</Text>
          <Text style={styles.description}>Reason for being here? {user.reason}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003049',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
