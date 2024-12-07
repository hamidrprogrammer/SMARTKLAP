const EventStatus = {
    Pending: 1,
    PreStart: 2,
    InProgress: 3,
    Finished: 4,
  };
  
  const EventStatusDisplayNames = {
    [EventStatus.Pending]: "Pending",
    [EventStatus.PreStart]: "PreStart",
    [EventStatus.InProgress]: "InProgress",
    [EventStatus.Finished]: "Finished",
  };
  
  // Example usage:
  const status = EventStatus.Pending;
    
  