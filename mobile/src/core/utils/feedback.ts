import { Toast } from "toastify-react-native";
import {
  ToastShowParams,
  ToastType,
} from "toastify-react-native/utils/interfaces";

// Extend with your custom types
type ExtendedToastType =
  | ToastType
  | "toast"


type FeedbackShowParams = Omit<ToastShowParams, "type"> & {
  type: ExtendedToastType;
};

// all short-lived UI responses to user actions
export const Feedback = {
  show: (options: FeedbackShowParams) => {
    Toast.show({
      ...options,
      useModal:false,
      type: options.type as ToastType,
    });
  },
  toast: (options?: FeedbackShowParams) => {
    Toast.show({
      ...options,
      type: "toast" as ToastType,
      text1: options?.text1 ?? "Copied Successfully",
      position: "center",
      visibilityTime: 3000,
    });
  },
};
