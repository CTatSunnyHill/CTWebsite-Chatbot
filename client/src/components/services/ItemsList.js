import React, { useEffect }  from 'react'
import { Application } from '@splinetool/runtime';
import '../pages/StyleforPage.css'

const ItemList = () => {
  useEffect(() => {
    // Initialize the Spline application
    const canvas1 = document.getElementById('spline-canvas-1');
    const app1 = new Application(canvas1);
    app1.load('https://prod.spline.design/EZySYr1V1NhBCT30/scene.splinecode');
  
    const canvas2 = document.getElementById('spline-canvas-2');
    const app2 = new Application(canvas2);
    app2.load('https://prod.spline.design/eXGfqUDyZO1itNQA/scene.splinecode');
  }, []);
    return (
       <> <div>Below are the technologies that are implemented by Clinical Technology @The Motion Lab in Sunny Hill Health Centre.</div>
            <h4>Assistive Gaming</h4>
            <div className="app">
                <main className="text-section">
                  <div className="highlighted-title">Xbox Adaptive Controller</div>
                  <p> The Xbox Adaptive Controller is a groundbreaking device designed by Microsoft to meet the needs of gamers with limited mobility. This inclusive piece of technology works by acting as a hub for assistive devices, allowing players to connect a wide range of external devices such as switches, buttons, and joysticks to create a custom controller setup tailored to their specific physical needs. <br/> Its large, programmable buttons and the connective ports array are engineered to be easily accessible, providing a flexible and adaptive gaming experience. The Xbox Adaptive Controller has been widely celebrated for its ability to open up video gaming to a broader audience, making play more accessible for individuals who might find traditional controllers challenging to use.</p>
                </main>
                  <aside className="animation-section">
                      <canvas id="spline-canvas-1" />
                  </aside>
            </div>
            <div className="app">
                <main className="text-section">
                  <div className="highlighted-title">Jelly Bean Switches</div>
                   <p>Jelly Bean Switches are another type of assistive technology that can be utilized for gaming. These switches are large, easy-to-press buttons that can be activated with a light touch or a push, making them ideal for users with fine motor challenges. When integrated with gaming setups like the Xbox Adaptive Controller, Jelly Bean Switches allow players to perform specific actions or commands in a game without the need for precise, complicated maneuvers. They are often color-coded for easy identification and can be mounted in various positions to cater to individual needs, providing a simple yet effective solution to engage with interactive entertainment.</p>    
                </main>
                  <aside className="animation-section">
                      <canvas id="spline-canvas-2" />
                  </aside>
            </div>
      
      <p className="Bullet">Flic switches represent a more modern approach to assistive technology in gaming. These wireless smart buttons are highly customizable and can be programmed to carry out a wide variety of functions, from simple clicks to triggering sequences of actions. In the context of gaming, Flic switches can be positioned strategically around a player's environment to act as accessible points of control. The small, discreet size and the stick-anywhere design of Flic switches mean they can be placed within reach of different body parts, offering a level of convenience and adaptability. Flic's compatibility with Bluetooth enables seamless integration with various devices and platforms, making it a versatile option for creating an assistive gaming setup.</p>
    

          <div>
            <h4>Smart Home Automation</h4>
            <ul>
            <li className="Bullet">Employing TP Link Kasa Smart Light Bulbs for streamlined lighting automation, compatible with digital assistants like Alexa, Google Home, and Apple Home. </li>
            <li className="Bullet">Leveraging Matter-based technology to enable remote or local control, enhancing accessibility and flexibility for users.</li>
            <li className="Bullet">Utilizing RGB color options and adjustable brightness levels for personalized lighting experiences, controllable via voice commands or the Kasa app.</li>
            <li className="Bullet">Integrating TP Link Kasa Smart Wifi plugs to automate non-smart devices such as fans and coffee makers, benefiting from the simplicity and industry-standard Matter technology.</li>
            <li className="Bullet">Seamlessly integrating Amazon Echo, Google Home Mini, and Homepods for Apple Home, providing a user-friendly interface for enhanced home automation.</li>
            <li className="Bullet">Addressing special needs by facilitating easier interactions through voice commands and simplified control mechanisms, catering to individuals with limited mobility or accessibility requirements.</li>
            </ul>
            <h4>3D Printed Custom Solutions</h4>
            <ul>
              <li className="Bullet">Utilizing 3D printers for rapid prototyping of custom solutions, including book reading scales and adaptive gaming controller kits, tailored to individual needs.</li>
              <li className="Bullet">Employing 3D printing technology to create specialized switches and custom-made joysticks, enhancing accessibility and usability for users.</li>
              <li className="Bullet">Leveraging the Prusa MK3 printer to support Rehab Tech with their 3D printing requirements, ensuring timely delivery of high-quality assistive devices.</li>
              <li className="Bullet">Utilizing PLA and ABS materials with a 0.6 mm nozzle diameter for versatile printing capabilities, accommodating various design specifications and durability needs.</li>
            </ul>
            <h4>Interactive Tech</h4>
            <ul>
              <li className="Bullet">Employing depth sensing cameras and projectors to create interactive gamified experiences for patients, mimicking their movements and gathering kinematic data for diagnosis and rehabilitation purposes.</li>
              <li className="Bullet">Enhancing patient engagement by providing a dynamic and interactive therapy environment, preventing boredom during exercises designed for their therapy.</li>
              <li className="Bullet">Adapting the system to modify the gym on the 3rd floor to replicate various floor settings, such as basketball or football courts, catering to different sports and activities.</li>
              <li className="Bullet">Implementing the same system in the Motion Lab to keep children motivated during analysis sessions, ensuring active participation and accurate data collection for assessments.</li>
            </ul>
            

          </div>
       </>
    )
}
export default ItemList