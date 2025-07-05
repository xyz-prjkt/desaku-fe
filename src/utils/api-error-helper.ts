const getFormattedErrorMessage = (message: unknown): string => {
  if (typeof message === "string") {
    return message;
  } else if (Array.isArray(message)) {
    return message.join("; ");
  } else if (typeof message === "object" && message !== null) {
    if (Object.values(message).some((value) => Array.isArray(value))) {
      return Object.entries(message)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}: ${value.join(", ")}`;
          } else {
            return `${key}: ${value}`;
          }
        })
        .join("; ");
    } else {
      return JSON.stringify(message);
    }
  } else {
    return "An unexpected error occurred. Please try again later.";
  }
};

export { getFormattedErrorMessage };
