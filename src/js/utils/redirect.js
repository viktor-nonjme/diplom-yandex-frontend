export default function redirect() {
  if (!localStorage.getItem('username')) {
    document.location.href = 'diplom-yandex-frontend/index.html';
  }
}
