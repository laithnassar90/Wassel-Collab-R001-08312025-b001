import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

export const RideRequestCreated = ({ notification }) => {
  return (
    <div className="notification__content">
      <Typography variant="body1">
        {notification.sender.name} sent you a ride request.
      </Typography>
    </div>
  );
};

RideRequestCreated.propTypes = {
  notification: PropTypes.object.isRequired,
};
