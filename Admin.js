function switchTab(tabIndex) {
  // Hide all tabs
  const tabs = document.querySelectorAll('.nav-tab');
  const contents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => tab.classList.remove('active'));
  contents.forEach(content => content.classList.remove('active'));
  
  // Show selected tab
  tabs[tabIndex].classList.add('active');
  contents[tabIndex].classList.add('active');
}

function addItem(type) {
  alert(`Add new ${type} functionality will be implemented with backend integration.`);
}

function viewItem(type, title) {
  alert(`View ${type}: "${title}"\n\nThis will open the item in read-only mode.`);
}

function editItem(type, title) {
  alert(`Edit ${type}: "${title}"\n\nThis will open the item editor.`);
}

function deleteItem(type, title) {
  if (confirm(`Are you sure you want to delete this ${type}?\n\n"${title}"`)) {
    alert(`${type} deleted successfully!`);
  }
}

// Add some hover effects and animations
document.addEventListener('DOMContentLoaded', function() {
  // Animate stat cards on load
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.5s ease';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100);
    }, index * 100);
  });
});