/**
 *  redirect to the login page
 */
export const handleUnauthorized = () => {
  // remove the access token from the local storage
  localStorage.removeItem('fetch-access-token')
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('redirect', window.location.pathname);
  window.location.href = `/login?${searchParams.toString()}`;

}