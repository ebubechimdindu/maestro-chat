// import { authTokenService } from '../auth/authTokenService';
// import { createMMKV } from 'react-native-mmkv'

// const ONBOARDING_KEY = 'onboarding_complete';
// const SIGNUP_COMPLETE_KEY = 'signup_complete';
// const GUEST_MODE_ACTIVE_KEY = 'guest_mode_active';
// const FIRST_RUN_KEY = 'app_first_run';
// const ATT_REQUESTED_KEY = 'att_permission_requested';

// export const appStorage = createMMKV({
//   id: 'maestro-ride-cache',
// })


// export const onboardingFlowStatusService = {
//   getStatus: (): boolean => {
//     try {
//       const value = appStorage.getString(ONBOARDING_KEY);
//       return value === 'true';
//     } catch (error) {
//       console.log('Error getting onboarding status:', error);
//       return false;
//     }
//   },
//   setComplete: (): void => {
//     try {
//       appStorage.set(ONBOARDING_KEY, 'true');
//     } catch (error) {
//       console.log('Error setting onboarding complete:', error);
//     }
//   },
// };

// export const authFlowService = {
//   isComplete: (): boolean => {
//     try {
//       const value = appStorage.getString(SIGNUP_COMPLETE_KEY);
//       return value === 'true';
//     } catch (error) {
//       console.log('Error getting signup status:', error);
//       return false;
//     }
//   },
//   setComplete: (): void => {
//     try {
//       appStorage.set(SIGNUP_COMPLETE_KEY, 'true');
//     } catch (error) {
//       console.log('Error setting signup complete:', error);
//     }
//   },
// };

// export const guestModeService = {
//   isActive: (): boolean => {
//     try {
//       const value = appStorage.getString(GUEST_MODE_ACTIVE_KEY);
//       return value === 'true';
//     } catch (error) {
//       console.log('Error getting guest mode status:', error);
//       return false;
//     }
//   },
//   setActive: (): void => {
//     try {
//       appStorage.set(GUEST_MODE_ACTIVE_KEY, 'true');
//     } catch (error) {
//       console.log('Error setting guest mode active:', error);
//     }
//   },
//   remove: (): void => {
//     try {
//       appStorage.remove(GUEST_MODE_ACTIVE_KEY);
//     } catch (error) {
//       console.log('Error removing guest mode:', error);
//     }
//   },
// };

// // --- New: first run / fresh install detection ---
// export const appFirstRunService = {
//   /**
//    * Only checks if the key exists.
//    * Does NOT set the key, allowing the caller to confirm
//    * cleanup is finished first.
//    */
//   isFirstRun: (): boolean => {
//     try {
//       const value = appStorage.getString(FIRST_RUN_KEY);
//       // If value is undefined, it's a fresh install/uninstall
//       return value !== 'true';
//     } catch (error) {
//       // In case of error, assume NOT first run to prevent
//       // accidental data wipes for existing users
//       console.error('Error checking first run status:', error);
//       return false;
//     }
//   },

//   /**
//    * Call this only AFTER clearAllAppData() has succeeded.
//    */
//   markAsRun: (): void => {
//     try {
//       appStorage.set(FIRST_RUN_KEY, 'true');
//     } catch (error) {
//       console.error('Error marking first run complete:', error);
//     }
//   },

//   clearFirstRun: (): void => {
//     try {
//       appStorage.remove(FIRST_RUN_KEY);
//     } catch (error) {
//       console.log('Error clearing first run key:', error);
//     }
//   },
// };

// export const attTrackingService = {
//   hasRequested: (): boolean => {
//     try {
//       const value = appStorage.getString(ATT_REQUESTED_KEY);
//       return value === 'true';
//     } catch (error) {
//       console.log('Error getting ATT request status:', error);
//       return true; // fail safe: assume already asked
//     }
//   },

//   markAsRequested: (): void => {
//     try {
//       appStorage.set(ATT_REQUESTED_KEY, 'true');
//     } catch (error) {
//       console.log('Error saving ATT request status:', error);
//     }
//   },
// };


// // --- Optional: clear all auth/onboarding/guest data ---
// export const clearAllAppData = async (): Promise<void> => {
//   try {
//     await authTokenService.deleteToken()
//     appStorage.clearAll();
//   } catch (error) {
//     console.log('Error clearing all app data:', error);
//   }
// };