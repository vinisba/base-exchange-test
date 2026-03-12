import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

interface AlertFeedbackProps {
  title?: string;
  description: string;
}

function AlertFeedback({ title, description }: AlertFeedbackProps) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

export { AlertFeedback };
