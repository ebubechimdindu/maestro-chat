import AppToast from "@/core/components/molecule/Feedback/AppToast";
import { ToastConfigParams } from "toastify-react-native/utils/interfaces";

// Custom toast configuration
export const toastConfig = {
  success: (props: ToastConfigParams) => (
    <AppToast toastType="success" text1={props.text1} text2={props.text2} onClose={props.hide} {...props} />
  ),
  error: (props: ToastConfigParams) => (
    <AppToast toastType="error" text1={props.text1} text2={props.text2} onClose={props.hide} {...props} />
  ),
  info: (props: ToastConfigParams) => (
    <AppToast toastType="info" text1={props.text1} text2={props.text2} onClose={props.hide} {...props} />
  ),
  warn: (props: ToastConfigParams) => (
    <AppToast toastType="warn" text1={props.text1} text2={props.text2} onClose={props.hide} {...props} />
  ),
  toast: (props: ToastConfigParams) => (
    <AppToast toastType="toast" text1={props.text1} text2={props.text2} onClose={props.hide} {...props} />
  ),
  banner: (props: ToastConfigParams) => (
    <AppToast toastType="banner" text1={props.text1} text2={props.text2} onClose={props.hide} {...props} />
  ),
};
