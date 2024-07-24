**View Written Code Here:** [Github Repository](https://github.com/OcularCreo/cooliganPangJordan_IMD3901_A3.git)

## The Overview
For this project, I created a variation of the classic arcade game, Whack-a-Mole. In this version, players hit moles until they run out of their five lives. The game starts in a lobby where players choose between co-op or competitive mode.

In co-op mode, players start the game by clicking a start button. They must be in range to click on the moles to whack them. Occasionally, a cork will appear during a wave of moles, provided that four corks are not already in use. Players can click on the cork to hold it and place it in any hole. Corked holes prevent moles from appearing, making the game more manageable.

In competitive mode, each player handles their own grid of moles. The game starts when two unique players have selected their sides. A cork spawns at the beginning of the game for either player to use, and players can steal it from each other to make their side easier to manage. Additionally, a jar of peanut butter may spawn between the two grids. Clicking on it sends an extra mole to the opponent in the next wave. The objective is to outlast your opponent.

## Challenges and Solutions

Understanding Socket.IO for real-time, bidirectional communication was initially challenging. I struggled to send messages from the server to all connected users without issues. I resolved this by thoroughly reading documentation, experimenting with code placement, and conducting numerous tests. This approach allowed me to understand Socket.IO better and ensure smooth multiplayer functionality.

Implementing the cork and peanut butter mechanics added complexity to the game’s logic. To manage this, I used pseudocode, graphs, and sketches to break down and visualize the problems. This method helped me successfully integrate these mechanics into the game.

## Technical Highlights

**Using A-Frame:** A-Frame enabled the creation of an interactive 3D environment, essential for managing the spatial interactions in the game.

**Socket.IO:** This technology was crucial for handling multiplayer aspects, ensuring that player actions were immediately reflected on all connected clients.

**Game Logic Complexity:** The additional elements like corks and peanut butter jars required careful planning and detailed understanding of the game state. Visualization tools were invaluable for mapping out these mechanics before implementation.

This project showcases my ability to handle complex web development tasks, particularly those involving real-time interactions and advanced game logic. It highlights my problem-solving skills, proficiency with modern web technologies, and capacity to deliver engaging, interactive experiences.