import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

export const RideRequestUpdated = ({ notification }) => {
  const statusText =
    notification.notification_type === 'ride_request_accepted'
      ? 'accepted your ride request.'
      : 'rejected your ride request.';

  return (
    <div className="notification__content">
      <Typography variant="body1">
        {notification.sender.name} {statusText}
      </Typography>
    </div>
  );
};

RideRequestUpdated.propTypes = {
  notification: PropTypes.object.isRequired,
};
