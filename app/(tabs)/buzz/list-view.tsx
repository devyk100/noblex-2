import PopupDialog from '@/components/ui/popup-dialog';
import { useModal } from '@/contexts/ModalContext';
import React, { useCallback } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Card, IconButton, List, Switch, Text } from 'react-native-paper';

const DATA = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  title: `Item ${i + 1}`,
  description: `This is description for item ${i + 1}`,
  imageUrl: `https://picsum.photos/seed/${i}/40/40`, // Example URL
}));

export default function ListView() {
  const { handlePresentModalPress, handlePresentModalClose } = useModal();

  const renderItem = useCallback(({ item }: { item: typeof DATA[0] }) => (
    <Card style={styles.card} elevation={2}>
      <List.Item
        title={item.title}
        description={item.description}
        left={() => (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.leftImage}
            resizeMode="cover"
          />
        )}
        right={() => (
          <View style={styles.rightButtons}>
            <PopupDialog Trigger={
              ({onClick}: {onClick: () => void}) => <IconButton
                icon="bell-outline"
                size={24}
                onPress={() => {
                  console.log('Notify', item.id)
                  onClick()
                }}
              />
            }
              title='Edit Notifications for Event'
              DialogContent={() => <>
                <View style={styles.row}>
                  <Text>Notify 10 minutes before</Text>
                  <Switch />
                </View>
                <View style={styles.row}>
                  <Text>Notify 1 hr before</Text>
                  <Switch  />
                </View>
                <View style={styles.row}>
                  <Text>Notify 2 hr before</Text>
                  <Switch  />
                </View>
              </>}
            />
            <IconButton
              icon="information-outline"
              size={24}
              onPress={() => {
                console.log('Details', item.id)
                handlePresentModalPress();
              }}
            />
          </View>
        )}
      />
    </Card>
  ), [handlePresentModalPress]);

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  listContent: { padding: 2 },
  card: { marginVertical: 4 },
  leftImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // make it circular
    marginRight: 8,
    marginLeft: 10,
    alignSelf: 'center',
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },

});
