## Software & Languages 
- Maya 
- Python 

## The Overview 
In this project, I developed a Maya User Interface (UI) that allows users to procedurally generate a variety of Lego Technic bricks. The UI provides adjustable attributes for each piece, enabling users to customize the depth, width, and height of standard Lego bricks. The project required the generation of specific mandatory pieces and the creation of an optional Lego Technic build to demonstrate the functionality of the UI.

This project demonstrates my ability to create a dynamic, user-friendly tool in Maya for procedural generation of 3D objects. By integrating modular coding practices and solving complex geometric challenges, I developed a versatile UI that can generate customizable Lego Technic pieces. This project highlights my skills in scripting, problem-solving, and 3D modeling, making it a valuable addition to my portfolio.

## Key Features

- **User Interface:** A UI in Maya that lets users select and adjust attributes for different Lego Technic pieces.
- **Procedural Generation:** The ability to generate various Lego bricks, including wheels, hubs, square blocks, Technic bricks, beams, and angled bricks.
- **Customization:** Adjustable characteristics for each brick type, reflecting the scalable nature of real Lego pieces.

## Approach
I began by using a script from a previous tutorial as a foundation, quickly adapting it for one of the mandatory bricks. I then modularized the existing code to create new functions for generating Lego Technic bricks, referencing online documentation for dimensions and specifications. Following a structured approach, I developed the Technic bricks, beams, and angled beams by reusing and adapting code, while creating unique code for the wheels and hubs due to their distinct characteristics. For the multi-angled Technic beam, I combined modularized code from previous pieces. I chose the Technic Telehandler as the final build, generating the necessary pieces using the UI and substituting or excluding non-generated pieces with similar shapes. Finally, I produced a render of the Technic Telehandler, applying consistent textures based on Autodesk’s settings for Lego renders.

## Additional Information
- **Attribute Limitations:** Adjustments were based on how Lego manufactures these pieces. For instance, the Technic bricks could only have their length adjusted within a specific range
- **Challenges:** Addressed issues with the polybool function by restructuring the code to perform a single large polybool operation, resulting in more predictable behavior and faster run times