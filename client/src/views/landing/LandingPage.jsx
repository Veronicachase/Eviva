import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import headerImage from '../../assets/images/LandingHero1.png';
import Logo from '../../assets/images/logotype_fullcolor_rgb 1.png';
import orangeTop from '../../assets/images/Color=Orange-80-Position=top-Device=Desktop.png';
import iconPoint from '../../assets/images/Color=Orange-Number=No-Size=96-Device=Desktop.png';
import iconPoint1 from '../../assets/images/Color=Default-Number=Yes-Size=80-Device=Mobile.png';
import scarfWomanImg from '../../assets/images/scarfWoman.png';
import timeLine1 from '../../assets/images/Type=Line-group-Group=1-Device=Desktop.png';
import timeLine2 from '../../assets/images/Type=Line-group-Group=4-Device=Desktop.png';
import timeline3 from '../../assets/images/Type=Line-group-Group=3-Device=Desktop.png';
import orangeBottom from '../../assets/images/Color=Orange-80-Position=Bottom-Device=Desktop.png';
import LandingSlice12 from "../../assets/images/LandingSlice1.2.png"
import LandingSlice2 from "../../assets/images/landingSlice2.jpg"
import LandingSlice3 from "../../assets/images/landingSlice3.png"
import LandingHeroFoorter1 from  "../../assets/images/LandingHeroFooter1.png"
import Agniezka from '../../assets/images/Col-left-Agniezka.png';
import Opinion1 from '../../assets/images/opinion1.jpeg';
import Opinion2 from "../../assets/images/opinion2.jpeg";
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Slider from "react-slick";
import '@fontsource/montserrat';
import '@fontsource/fahkwang';
import "./landingPage.css"
function LandingPage() {
  const [timeLeft, setTimeleft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const dueDate = new Date('2024-10-25T13:00:00');
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeDifference = dueDate - now;
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
      setTimeleft({ days, hours, minutes }, 1000);
    });
    return () => clearInterval(intervalId);
  }, []);

 
    const settings={
      dots:true,
      infinite:true,
      speed:500,
      slidesToShow:1,
      slidesToScroll:1,
      arrows:true,
      autoplay:true,
      autoplaySpleed:3000,
      rtl:true,
    }
  

  return (
    <div className="container-fluid main">
      <div className="wrapper">
        <img className="hero" src={headerImage} alt="Hero" />
        <img className="logo" src={Logo} alt="Logo" />
        <div />
        <div className="modal-container">
          <h4>
            YOU FEEL TIRED, HUNGRY, FUGGY, ANXIOUS, AND YOU CRAVE FOR SUGAR ALL
            THE TIME?
          </h4>
          <p className="thinHeaderText"> JOIN LIVE </p>
          <p className="thinHeaderText"> WOMEN´S HORMONAL HEALTH WEBINAR</p>
          <h1>Boost Your Mood & Get Back Your Energy</h1>
          <p className="thinHeaderText"> 10TH SEPTEMBER 2024 12PM -1 CET</p>
          <Link to="/LandingForm">
            <button className="mainButton">SAVE YOUR SPOT</button>
          </Link>
          
        </div>
        </div>


        <div className ="wrapper">
          <img className="orangeTop" src={orangeTop} alt="Orange Top" />
          <div className="webinarInfo">
          <h1 className="secondaryh1">Webinar starts in</h1>
          <div className="d-flex mb-5 mt-5">
          <div className="round">
            {timeLeft.days} 
          </div>
          <div className="round">
            {timeLeft.hours} 
          </div>
          <div className="round">
            {timeLeft.minutes} 
          </div>
          </div>
          <Link to="/LandingForm">
            <button className="mainButton">SAVE YOUR SPOT</button>
          </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h1 className="secondaryh1"></h1>
            <div>
            <div><img src={iconPoint} alt="Exhausted" /> <span>EXHAUSTED</span><p>No matter how much you sleep?</p></div>
            <div><img src={iconPoint} alt="Foggy-headed" /> <span>FOGGY-HEADED</span><p>and unable to focus?</p></div>
            <div><img src={iconPoint} alt="Hungry" /> <span>HUNGRY</span><p>Shortly after eating?</p></div>
            <div><img src={iconPoint} alt="Anxious" /> <span>ANXIOUS</span><p>And on edge?</p></div>
            <div><img src={iconPoint} alt="Craving Sugar" /> <span>CRAVING SUGAR</span><p>All the time?</p></div>
            </div>
          </div>
          <div className="col-md-6">
            {' '}
            <img src={scarfWomanImg} alt="Scarf Woman" />
          </div>
        </div>
      
    <div className="diveInto mb-5 mt-5">
      <div>
        <img src={timeLine1}/>
      </div>
    <h2>What we´ll dive into: </h2>

      <div className="row-3">
        <div>
          {' '}
          <img src={iconPoint1}/>
          <span>UNDERSTANDING THE SYMPTOMS:</span>
          <p>
            Explore the causes of fatigue, brain-fog, anxiety, sleep issues, and
            sugar cravings
          </p>
        </div>
        <div>
          {' '}
          <img src={iconPoint1} alt="icon point"/>
          <span>PRACTICAL TIPS:</span>
          <p>
            Gain simple, everyday strategies to combat brain fog, improve focus,
            and manage and reduce symptoms
          </p>
        </div>
        <div>
          {' '}
          <img  src={iconPoint1}/>
          <span>ROOT CAUSES AND SOLUTIONS:</span>
          <p>
            Identify what´s contributing to your anxiety and sleep problems and
            get actionable solutions to start feeling better
          </p>
        </div>
        <div>
          {' '}
          <img src={iconPoint1}/>
          <span>HORMONAL SHIFTS:</span>
          <p>
            Learn how hormonal changes affect these symtoms and uncover what´s
            really going on in your body
          </p>
        </div>
        <div>
          {' '}
          <img src={iconPoint1}/>
          <span>BALANCING HORMONES:</span>
          <p>
            Discover ways to balance your hormones and curb your sugar craving
          </p>
        </div>
        <div>
          {' '}
          <img src={iconPoint1} alt="icon point 1"/>
          <span>COMMUNITY SUPPORT:</span>
          <p>
            Connect with other women facing similar challenges and share
            experiences
          </p>
        </div>
        <Link to="/LandingForm">
          <button className="mainButton">SAVE YOUR SPOT</button>
        </Link>
        <div>
        </div>

        <img src={timeline3}/>
        
        </div>

        <div className='d-flex  justify-between'>
          <div >
            <img src={Agniezka}/>
          </div>
         
          <div>
            <h2>Meet our speaker</h2>
            <h4>Agnieszka Fronia</h4>
            <p>
              Hi, I am Agnieszka and I am certified woma’s health expert with
              passion for helping others. For many years, I struggled with
              hormonal health issues such as acne, hair loss, weight gain,
              absence of periods, insomnia, and high levels of stress and
              anxiety. Feeling confused, tired, and often ignored by many
              doctors, I decided to take control of my health. Since 2015, I´ve
              travelled across South America and India, exploring various
              methods to resolve my symptoms. Along the way, I became a
              certified yoga, meditation, and breath-work teacher. Additionally,
              I earned an MSc in Psychological Medicine and Mental Health from
              London Metropolitan University, related to hormones, inflammation
              and gut health. My goal is to help you navigate your hormonal,
              physical, psychological, and emotional health with ease. Join my
              upcoming webinar so we can get to know each other better and gain
              the knowledge you need to take control of your health.
            </p>
            </div>
            <div >
          </div>
        </div>

        <div>
          <img src={timeLine2}/>
        </div>

        <div className="row">
          <div className="col-6">
            <h2>What is Oviva Care?</h2>
            <p>
              Our mission is to create a future where every woman has the
              Knowledge, Resources and Support Pellentesque non tincidunt eget
              molestie libero. Aenean ut quis adipiscing amet. Sociis imperdiet
              luctus eget sagittis nisl. Sed ut lectus amet nulla lectus vitae.
              Mattis volutpat natoque ac quis vestibulum. Mauris id massa sed
              facilisi et amet consectetur tempor consectetur.{' '}
            </p>
          </div>
          <div className="col-6 carrousel">
        <Slider{...settings}>
        <div className="carrouselImg"> <img src={LandingSlice12} alt=""/> </div>
        <div className="carrouselImg" >  <img src={LandingSlice2} alt=""/> </div>
        <div className="carrouselImg"> <img src={LandingSlice3} alt=""/> </div>
        </Slider>

           
           
            
          </div>
        </div>

        <div>
          <div>
            <img src={timeline3}/>
          </div>
          <h2>What people are saying</h2>

          <div className="d-flex gap-5">
            <div className="commentDiv">
              <div className="roundedComment">
              <img className="rounded" src={Opinion1} alt="User Opinion 1" />
              </div>
              <p>
                Very resonating session with a good balance for theory and
                practice. Very practical and easy to integrate. I think the
                hormonal world is a very unknown and influential world, so I
                believe more webinars like this are needed more often.
              </p>
              <p>Name</p>
            </div>

            <div className="commentDiv">
              <div className="roundedComment">
              <img className="rounded" src={Opinion2} alt="User Opinion 2" />
              </div>

              <p className="comillas">''</p>

              <p className="commentText">
                Very resonating session with a good balance for theory and
                practice. Very practical and easy to integrate. I think the
                hormonal world is a very unknown and influential world, so I
                believe more webinars like this are needed more often.
              </p>
              <p>Name</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <img src={orangeBottom}/>
        <div className="row">
          <div className="col-md-6">
            <img src={LandingHeroFoorter1} alt=""/>
          </div>
          <div className="col-md-6">
            <h3>SIGN UP NOW</h3>
            <p>WEBINAR DAY 10TH SEPTEMBER 2024</p>
            <h2>Boost Your Mood & Get Back Your Energy</h2>
            <Link to="/LandingForm">
              <button className="mainButton">SAVE YOUR SPOT</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="flex">
          <div className="footerIcons flex">
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
          </div>
          <div>
            {' '}
            <h5>CONTACT US</h5>
          </div>
        </div>

        <div className="flex">
          <div>@ all rights reserved to Oviva Care</div>
          <div className="flex">
            <p>Privacy</p>
            <p>Terms and condition</p>
            <p>Cookies</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
