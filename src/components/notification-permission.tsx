import { useState } from "react";

const NotificationPermission = () => {
  const [permissionStatus, setPermissionStatus] =
    useState<NotificationPermission>(() => Notification.permission);

  return (
    <>
      {permissionStatus === "default" && (
        <button
          className="absolute top-2 left-2 hidden cursor-pointer text-sm text-gray-400 hover:text-gray-300 sm:block"
          onClick={() => {
            if ("Notification" in window) {
              void Notification.requestPermission().then((permission) => {
                setPermissionStatus(permission);
              });
            }
          }}
          title="Enable notifications for when your timer is complete"
          aria-label="Enable notifications"
        >
          Enable notifications
        </button>
      )}
    </>
  );
};

export default NotificationPermission;
