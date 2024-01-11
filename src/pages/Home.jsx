export default function Home() {

  const handlePasswordChange = function(e) {
    if (e.target.value === 'ctrl+zzz') {
      console.log('got password');
    }
  }

  return (
    <div className="page-container">
      Home Page
    </div>
  );
}
