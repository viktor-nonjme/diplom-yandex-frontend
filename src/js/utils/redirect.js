export default function redirect() {
  if (!localStorage.getItem('username')) {
    document.location.href = '../index.html';
  }
}
