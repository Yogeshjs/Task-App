/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, Pressable} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export const Card = ({
  id,
  title,
  description,
  date,
  completed,
  onDeletePress,
  handleToggle,
}: {
  id: number;
  title: string;
  date: string;
  completed: boolean;
  onDeletePress: any;
  handleToggle: any;
  description: string;
}) => {
  return (
    <View style={[styles.card, {borderColor: completed ? 'green' : 'red'}]}>
      <Pressable style={styles.toggleCard} onPress={() => handleToggle(id)}>
        <View style={styles.cardInfo}>
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.cardTitle,
                {textDecorationLine: completed ? 'line-through' : 'none'},
              ]}>
              {title}
            </Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        {description ? (
          <View style={{marginBottom: 15}}>
            <Text>{description}</Text>
          </View>
        ) : null}
      </Pressable>
      <Pressable style={styles.deleteTaskBtn} onPress={() => onDeletePress(id)}>
        {/* <Text>Delete</Text> */}
        <FontAwesome6 solid style={{fontSize: 20}} name="xmark" />
      </Pressable>
    </View>
  );
};

// const styles1 = StyleSheet.create({
//   cardContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 8,
//     backgroundColor: '#FFFFFF',
//     elevation: 2, // Android shadow
//     shadowColor: '#000000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: {width: 0, height: 2},
//   },
//   cardContent: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   date: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   deleteIcon: {
//     marginLeft: 16,
//   },
// });

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 8,
    justifyContent: 'space-around',
    // height: 'auto',
    borderLeftWidth: 3,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 3, // Android shadow
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  cardInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  toggleCard: {
    flex: 1,
    paddingTop: 10,
    // paddingBottom: 8,
    paddingHorizontal: 15,
  },
  deleteTaskBtn: {
    paddingTop: 15,
    paddingBottom: 8,
    paddingHorizontal: 15,
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
  },
  date: {
    fontSize: 14,
    color: '#666666',
    paddingBottom: 10,
  },
});
