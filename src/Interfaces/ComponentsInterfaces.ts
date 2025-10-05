export interface INotificationCardProps {
  message: string;
  isSuccess: boolean;
  show: boolean;
  onClose: () => void;
  duration?: number;
}
