import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { AlertButtonType, AlertConfig } from "../components/molecule/Feedback/Alert";
import AppAlert from "../components/molecule/Feedback/Alert/AppAlert";
import { alert } from "../utils/AlertManager";

/**
 * Alert context type for hook-based API
 */
interface AlertContextType {
    alert: (config: string | AlertConfig, message?: string, buttons?: AlertButtonType[]) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider: FC<PropsWithChildren> = ({ children }) => {
    const [alertState, setAlertState] = useState<AlertConfig & { visible: boolean }>({
        title: '',
        message: undefined,
        buttons: undefined,
        visible: false,
    });

    // Hook-based API
    const showAlert = useCallback((titleOrConfig: string | AlertConfig, message?: string, buttons?: AlertButtonType[]) => {
        let config: AlertConfig;

        if (typeof titleOrConfig === 'string') {
            config = {
                title: titleOrConfig,
                message,
                buttons,
            };
        } else {
            config = titleOrConfig;
        }

        setAlertState({
            ...config,
            visible: true,
        });
    }, []);

    const handleDismiss = useCallback(() => {
        setAlertState(prev => ({
            ...prev,
            visible: false,
        }));
    }, []);

    useEffect(() => {
        alert.setAlertHandler(showAlert);
        return () => {
            alert.setAlertHandler(() => {
                console.warn('AlertProvider unmounted');
            });
        };
    }, [showAlert]);

    return (
        <AlertContext.Provider value={{ alert: showAlert }}>
            {children}
            <AppAlert
                visible={alertState.visible}
                title={alertState.title}
                message={alertState.message}
                buttons={alertState.buttons}
                showIcon={alertState.showIcon}
                renderIcon={alertState.renderIcon}
                titleType={alertState.titleType}
                messageType={alertState.messageType}
                titleLightColor={alertState.titleLightColor}
                titleDarkColor={alertState.titleDarkColor}
                messageLightColor={alertState.messageLightColor}
                messageDarkColor={alertState.messageDarkColor}
                titleColor={alertState.titleColor}
                messageColor={alertState.messageColor}
                onDismiss={handleDismiss}
            />
        </AlertContext.Provider>
    );
};

/**
 * Hook to access alert API
 * 
 * @example
 * const { alert } = useAlert();
 * 
 * alert('Title', 'Message');
 * 
 * alert({
 *   title: 'Custom Alert',
 *   message: 'With custom config',
 *   buttons: [{ title: 'OK' }]
 * });
 */
export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within AlertProvider');
    }
    return context;
};