import React, { createContext, useContext } from 'react';

interface ModalContextType {
  handlePresentModalPress: () => void;
  handlePresentModalClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps extends React.PropsWithChildren {
  handlePresentModalPress: () => void;
  handlePresentModalClose: () => void;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  handlePresentModalPress,
  handlePresentModalClose,
}) => {
  return (
    <ModalContext.Provider value={{ handlePresentModalPress, handlePresentModalClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
