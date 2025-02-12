export const handleUnauthorized = () => {
  localStorage.removeItem('authToken');
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('redirect', window.location.pathname);
  window.location.href = `/login?${searchParams.toString()}`;

}