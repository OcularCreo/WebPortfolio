
export const MultiCarousel = () =>{
    
    return (
        <div>
            {
                //loop through all indexes in data, create the following elements
                data.map((d) => (
                    <div>

                    </div>
                ))
            }
        </div>
    );

    const data = [
        
        //
        {
            Title: "Programming", 
            icon: "", 
            description: "C, C++ C#, Java, JavaScript, HTML, CSS, Python, React, Automated Testing, Git"
        }, 
        
        {
            Title: "Game Development", 
            icon: "", 
            description: "Unity, Unreal Engine"
        }, 

        {
            Title: "3D Modeling & Animation", 
            icon: "", 
            description: "Maya, Blender"
        }, 

        {
            Title: "Design & Graphics", 
            icon: "", 
            description: "Adobe: Illustrator, Photoshop, Premiere Pro, InDesign, After Affects, Lightroom"
        }, 
    ]; 

}