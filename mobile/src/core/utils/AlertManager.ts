import { AlertButtonType, AlertConfig } from "../components/molecule/Feedback/Alert";

class AlertManager {
    private showAlertCallback: ((config: AlertConfig) => void) | null = null;

    /**
   * Register the alert callback from the provider
   * This is called internally by AlertProvider
   */
    setAlertHandler(callback: (config: AlertConfig) => void) {
        this.showAlertCallback = callback;
    }


    /**
    * Public API to show alerts
    * Can be called from anywhere in the app
    */
    alert(titleOrConfig: string | AlertConfig, message?: string, buttons?: AlertButtonType[]) {
        if (!this.showAlertCallback) {
            console.warn('AlertProvider not mounted. Alert cannot be shown.');
            return;
        }

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

        this.showAlertCallback(config);
    }
}

// Create singleton instance
export const alert = new AlertManager();
