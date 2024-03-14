
    document.getElementById('userForm').addEventListener('submit', async function(event) {
        event.preventDefault();
      
        const uri = 'mongodb://localhost:27017/Users';

        const formData = new FormData(this);
        const jsonData = {};
        formData.forEach((value, key) => {
          jsonData[key] = value;
        });
      
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonData)
        });
      
        if (response.ok) {
          alert('User details saved successfully!');
          // Optionally, reset the form after successful submission
          this.reset();
        } else {
          alert('Failed to save user details.');
        }
      });

