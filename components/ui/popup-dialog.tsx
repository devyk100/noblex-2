import React, { JSX, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

export default function PopupDialog({ Trigger, title, DialogContent, onAccept, onCancel }: {
  Trigger: ({ onClick }: { onClick: () => void }) => JSX.Element;
  title: string;
  DialogContent: React.FC;
  onCancel?: () => void
  onAccept?: () => void
}) {
  const [visible, setVisible] = useState(false);
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Trigger onClick={showDialog} />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <DialogContent />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
              if (onCancel) onCancel()
              hideDialog()
            }}>Cancel</Button>
            <Button onPress={() => {
              if (onAccept) onAccept()
              hideDialog()
            }}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
});
