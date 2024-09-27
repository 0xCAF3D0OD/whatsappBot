export function Header() {
    return `
        <header class="flex justify-between items-center mb-16">
          <h1 class="text-2xl font-bold text-custom">On Assemble</h1>
          <nav>
            <ul class="flex space-x-6">
              <li><a href="#" class="text-custom hover:underline">Features</a></li>
              <li><a href="#" class="text-custom hover:underline">Pricing</a></li>
              <li><a href="#" class="text-custom hover:underline">About</a></li>
            </ul>
          </nav>
        </header>
    `;
}

export function WelcomeMessage() {
    return `
        <div class="text-center mb-16">
          <h2 class="text-6xl font-bold text-custom mb-6">Welcome to Our Platform</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Plan, proof, and present your projects with a simple timeline. No complex Gantt charts,
            just straightforward organization.
          </p>
        </div>
    `;
}

export function DateTimeDisplay() {
    return `
        <div class="text-center mb-16">
          <p class="text-5xl font-light text-custom" x-text="currentTime"></p>
          <p class="text-xl text-gray-600 mt-2" x-text="currentDate"></p>
        </div>
  `;
}

export function CoverImage() {
    return `
        <div class="relative mb-16">
          <img src="https://www.contus.com/blog/wp-content/uploads/2023/03/chat-user-interface-1024x535.png"
               alt="Cover Image" class="w-full h-auto object-cover rounded-lg shadow-lg">
          <div class="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 rounded-lg">
            <h3 class="text-4xl font-bold">Let the chat Bot check your message</h3>
          </div>
        </div>
  `;
}

export function ConnectionTest() {
    return `
        <div x-data="{
            message: 'Testing connection...',
            testBackend() {
                fetch('http://localhost:3000/whatsappBot/api/test')
                    .then(response => response.json())
                    .then(data => {
                        this.message = data.message;
                        setTimeout(() => {
                            Alpine.raw($router).navigate('/whatsappBot');
                        }, 1000);
                    })
                    .catch(error => {
                        this.message = 'Error connecting to backend';
                        console.error('Error:', error);
                    });
            }
        }" class="text-center mb-16">
          <h3 class="text-2xl font-light text-custom mb-6" x-text="message"></h3>
          <button @click="testBackend()" class="button-custom px-8 py-3 rounded-full text-lg font-semibold transition duration-300">
            Test redirection page
          </button>
        </div>
    `;
}

// export function ConnectionTest() {
//     return `
//         <div x-data="{
//             message: 'Testing connection...',
//             testBackend() {
//                 fetch('http://localhost:3000/whatsappBot/api/test')
//                     .then(response => response.json())
//                     .then(data => {
//                         this.message = data.message;
//                     })
//                     .catch(error => {
//                         this.message = 'Error connecting to backend';
//                         console.error('Error:', error);
//                     });
//             }
//         }" class="text-center mb-16">
//           <h3 class="text-2xl font-light text-custom mb-6" x-text="message"></h3>
//           <button @click="testBackend()" class="button-custom px-8 py-3 rounded-full text-lg font-semibold transition duration-300">
//             Test Backend Connection
//           </button>
//         </div>
//     `;
// }

export function FeaturesGrid() {
    return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div class="text-center">
            <h4 class="text-xl font-semibold mb-2">Plan</h4>
            <p class="text-gray-600">Organize tasks and discussion in a visual interface chatbot</p>
          </div>
          <div class="text-center">
            <h4 class="text-xl font-semibold mb-2">Proof</h4>
            <p class="text-gray-600">Share message, assets, and docs via review links in chatBot</p>
          </div>
          <div class="text-center">
            <h4 class="text-xl font-semibold mb-2">Present</h4>
            <p class="text-gray-600">Invite clients and partners into your workflow</p>
          </div>
        </div>
  `;
}

export function Footer() {
    return `
        <footer class="bg-gray-100 py-8">
          <div class="container mx-auto text-center text-custom">
            <p>&copy; 2024 On Assemble. All rights reserved.</p>
          </div>
        </footer>
  `;
}
