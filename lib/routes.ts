export const ROUTES = {

    HOME: '/',
     EVENTS: {
    DETAILS: (eventId: any) => `/events/${eventId}`,
  },
    ADMIN: {
    DASHBOARD: '/admin/dashboard',
    LOGIN: '/admin/login',
    ADDEVENT: '/admin/addevent',
    EDITEVENT:(eventId: any) => `/admin/editevent/${eventId}`,

  },
  USER:{
    LOGIN:'/user/login',
    BOOKINGS:'/user/mybookings'
  }
};
export default ROUTES;