import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import NavComponent from '../../components/NavComponent';
import { use100vh } from 'react-div-100vh'
import useWindowDimensions from './../../components/DimensionsHook';
import emailjs from '@emailjs/browser';

import Modal from "react-modal";
import ReactDOM from 'react-dom';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useForm } from "react-hook-form";


export default function StartProject() {

  const hh2 = use100vh()
  const { height, width } =  useWindowDimensions();
  const isMobile = width < 620 || (typeof document != 'undefined' && window.innerWidth < 620);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const setWhatModalOpen = 'TwentyFive';

  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  let timeoutID = null;

  //const form = useRef();
  const form = useRef();
  const setSent = false;

  const sendEmail = (e) => {
    e.preventDefault();

    setIsSending(true);
    //setSent = false;

    emailjs.sendForm('service_ujzh39j', 'template_4p8s10k', form.current, 'c9746fpMBdnnbSHYh')
      .then((result) => {
          console.log(result.text);
          console.log(form.current);
          setIsSending(true);
          //setSent=true;
          setUploadModalOpen('sent')
          timeoutID = setTimeout(() => {
            //alert('Sent!');
            setIsSending(false);
            
          }, 3000);
      }, (error) => {
          console.log(error.text);
          timeoutID = setTimeout(() => {
            alert(error.text);
            setIsSending(false);
          }, 3000);
      });
  };

  const [value, setValue] = useState()
  console.log(value);
  const [form2, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    shippingAddress: "",
    projectAddress: "",

    customDesign: "",
    description: "",
    image: "",
    dimensionDetails: "",
    manufactureDetails: "",

    designText: "",
    deadline: "",
    budget: "",
    comment: ""
})

const [count, setCount] = useState(1)

const updateForm = (e) => {
    setForm ({
        ...form,
        [e.target.name]: e.target.value,
    })
    console.log(e.target)
    console.log(form)
}

const sendEmail2 = (e) => {
    e.preventDefault();

    emailjs.sendForm(
        'service_z3p8h0m', 
        'template_svmf3nm', 
        e.target,
        'user_7Pf1rN0FgZQwrrMpFSw55'
    )
      .then((result) => {
          console.log(
              result
              );
      }, (error) => {
          console.log(error);
      });
    e.target.reset();
}

function clickedMe(e) {
    e.preventDefault();
    console.log('You clicked me.');
  }



  return (
    <>
    <div className="grain"></div>
    <div className={styles.container + " loadingScreen formScreen"} style={{ height: isMobile ? hh2 : '100vh' }} id="main-content">
      <Head>
        <title>Pacific Interlude</title>
        <meta name="description" content="Start Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>

      <div className={`d-flex w-100 h-form flex-column ${styles.body}`} id="main-body">
        <NavComponent />
        <div className={`d-flex flex-column p-4 ${styles.about}`} style={{ maxHeight: 'calc(100% - 3rem)' }}>
          <h5>Let's create together</h5>

          

        {/*  <h6 className = "form-step"> steps: {count} of 4 </h6>*/}
    
    <form ref={form} onSubmit = { sendEmail } className={`text-center`}>
    <div className="form-tile mx-auto">
           <label> select how we can help </label>
        </div> 
<fieldset className="startform select-group flex-flow mx-auto">
    {/*<legend>You're interested in </legend>*/}
    <label for="video-production" className="select-box bg-color-neu ">
        <input type="checkbox" id="video-production" name="Inquiry" value="Video_Production" disabled={isSending}/>
        <span className="select-tile flex-flow radius-8 ">
        
            <span>video production</span>
        </span>
    </label>

    <label for="web-design" className="select-box bg-color-neu ">
        <input type="checkbox" id="web-design" name="Inquiry" value="Web_Design" disabled={isSending}/>
        <span className="select-tile flex-flow radius-8 ">
      
            <span>web design</span>
        </span>
    </label>

    <label for="social-media-management" className="select-box bg-color-neu ">
        <input type="checkbox" id="social-media-management" name="Inquiry" value="Social_Media_Management" disabled={isSending}/>
        <span className="select-tile flex-flow radius-8 ">
         
            <span>social media management</span>
        </span>
    </label>

    <label for="marketing-advertising" className="select-box bg-color-neu ">
        <input type="checkbox" id="marketing-advertising" name="Inquiry" value="Marketing_Advertising" disabled={isSending}/>
        <span className="select-tile flex-flow radius-8 ">
      
            <span>marketing / advertising</span>
        </span>
    </label>

    <label for="photo-production" className="select-box bg-color-neu ">
        <input type="checkbox" id="photo-production" name="Inquiry" value="Photo_Production" disabled={isSending}/>
        <span className="select-tile flex-flow radius-8 ">
         
            <span>photo production</span>
        </span>
    </label>

    <label for="something-else" className="select-box bg-color-neu ">
        <input type="checkbox" id="something-else" name="Inquiry" value="Something_else" disabled={isSending}/>
        <span className="select-tile flex-flow radius-8 ">
    
            <span>something else</span>
        </span>
    </label>
    
</fieldset>
<div className="input-tile grid-container padding-16">
    {/*<div className="item-4">
        <label> customer info </label>
  </div>*/}
    <div className="grid-field item-2-mb">
        <label>First Name *</label>
        <input type="text" name="user_name" disabled={isSending} required/>
    </div>
    <div className="grid-field item-2-mb">
        <label>Last Name</label>
        <input type="text" name="user_last" disabled={isSending}/>
    </div>
    <div className="grid-field item-2">
        <label>Email *</label>
        <input type="email" name="user_email" disabled={isSending} required/>
       
    </div>
    <div className="grid-field item-2-mb">
        <label>Phone </label>
  
        <PhoneInput
      placeholder="Enter phone number"
      value={form.phone}
      onChange={setValue} defaultCountry="US" name="user_phone" disabled={isSending}/>
    </div>
    <div className="grid-field item-4">
        <label>Company Website</label>
        <input type="text" name="user_website" disabled={isSending}/>
    </div>
   {/* <div className="item-4">

        <label> project description </label>
    </div>
    */}

  

</div>
<div className="form-tile mx-auto">
           <label> select your budget </label>
        </div>
<fieldset className="startform click-group flex-flow mx-auto">
    {/*<legend>You're interested in </legend>*/}
    
    <label for="budg-1" className="select-box bg-color-neu ">
        <input type="radio" id="budg-1" name="Budget" value="$5,000 - $10,000"/>
        <span className="click-tile flex-flow radius-8 ">
     
            <span>$5,000 - $10,000</span>
        </span>
        <button button type="button" onClick={() => setUploadModalOpen('1')} className="click-link">
            view example 
        </button>
    </label>

    <label for="budg-2" className="select-box bg-color-neu ">
        <input type="radio" id="budg-2" name="Budget" value="$10,000 - $25,000"/>
        <span className="click-tile flex-flow radius-8 ">
        
            <span>$10,000 - $25,000</span>
        </span>
        <button button type="button" onClick={() => setUploadModalOpen('2')} className="click-link">
            view example 
        </button>
    </label>

    <label for="budg-3" className="select-box bg-color-neu ">
        <input type="radio" id="budg-3" name="Budget" value="$25,000 - $50,000"/>
        <span className="click-tile flex-flow radius-8 ">
     
            <span>$25,000 - $50,000</span>
        </span>
         <button button type="button" onClick={() => setUploadModalOpen('3')} className="click-link">
            view example
        </button>
        
    </label>

    <label for="budg-4" className="select-box bg-color-neu ">
        <input type="radio" id="budg-4" name="Budget" value="$50,000 - $100,000"/>
        <span className="click-tile flex-flow radius-8 ">
       
            <span>$50,000 - $100,000</span>
        </span>
        <button type="button" onClick={() => setUploadModalOpen('4')} className="click-link">
            view example
        </button>
    </label>

</fieldset>

<div className="input-tile grid-container text-container padding-16">

    <div>
        <label>briefly describe your project</label>
        <textarea name="message" disabled={isSending}/>
  </div>
  </div>


<div>
   
      
    </div>

    
      {/* SUBMIT button */}
      <button
      className="btn-black"
        type="submit"
        disabled={isSending}
        >
        {isSending ? 'Sending...' : 'Send'}
        
      </button>
      
      
    </form>
   
    
    <div>
      
    </div>

  
  
        </div>
      </div>
    </div>
    <NewPhotoModal isOpen={uploadModalOpen} setOpen={setUploadModalOpen} setWhat={setWhatModalOpen}/>
    </>
  )
}

Modal.setAppElement('#root');

export const NewPhotoModal = (props) => {
   
    console.log('open new modal');
    console.log(props);
    console.log(props.setWhat);
    let setWhatModalOpen;
    setWhatModalOpen = props.isOpen;

    const handlePicChange = (e) => {
        setFilesLength(e.target.files.length)
    }

    const customStyles = {
        overlay: {zIndex: 1000, overflow: "scroll"},
        content: {
            
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "clamp(400px, 60vw, 70vw)",
            inset: "50% auto auto 50%",
        },
    };

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
      
        
        console.log('setOpen to ', setWhatModalOpen)
        //props.setWhat = setWhatModalOpen;
      }
    const onClose = () => {
        props.setOpen(false);
        setWhatModalOpen = null;
        console.log('setOpen to ', setWhatModalOpen)
      
    };
    function handleOpenModal () {
        this.setState({ showModal: true });
      };
      
    function handleCloseModal () {
        this.setState({ showModal: false });
      };
    

    return (
        <Modal
            isOpen={props.isOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel={props.setWhat}
            appElement={
                //process.window ? document.getElementById("main-content") : null
                process.window ? document.getElementById('root') : null
                
            }
        >
            <div className={`d-flex w-100 flex-column text-modal`}>
            

               

               
                {!setWhatModalOpen ? (
                    <div className={`d-flex flex-column mb-3`}>
                        <div className={`d-flex flex-column`}>
                            <h1>no setWhat</h1>
                            
                        </div>
                        
                    </div>
                ) : (
                    <>
                    {setWhatModalOpen == '1' && (
                    <div className={`d-flex flex-column mb-3`}>
                        <div className={`d-flex flex-column`}>
                            <div className={`d-flex justify-content-between`}>
                        
                                <div className={`d-flex flex-column mb-3`}>
                                        <p>$5,000-$10,000:</p>
                                        <h3>Corpus Naturals Campaign</h3>
                                </div>
                                    <button onClick={onClose} className={"btn-black btn-close"}>
                                        <i className="fa fa-times"></i>
                                    </button>
                            </div>
                            
                            <p>At Pacific Interlude, we're experts in creating visually stunning campaigns that not only align with your brand's aesthetic and messaging, <span className="text-darkgreen">but also bring even more eyes over to your brand.</span></p>


                            <p>For our recent project with Corpus Naturals, a natural deodorant and body wash company, we brought the brand's message of naturalness to life.</p>


                            <p>We scouted a model who embodied the natural and organic feeling of the brand and booked an all-wood house located in Topanga California to serve as the perfect location for the campaign.</p>


                            <p>Our team curated an aesthetic that encapsulated the natural essence of the brand, and we shot the entire campaign on 35mm film to give it a more natural and organic feel. <span className="text-darkgreen">We understand that managing a campaign shoot can be time consuming, so we are here to take the hassle out of the process as a one stop shop for directing, producing and post production needs.</span></p>


                            <p>The end result was a visually stunning campaign that effectively conveyed Corpus Natural's message and product offerings.</p>


                            <p>When you partner with Pacific Interlude, you can be confident that we will bring your brand's message to life in a visually striking and effective way.</p>
                                                
                        </div>
                    </div>
                    )}


                    {setWhatModalOpen == '2' && (
                    <div className={`d-flex flex-column mb-3`}>
                        <div className={`d-flex flex-column`}>
                            <div className={`d-flex justify-content-between`}>
                        
                                <div className={`d-flex flex-column mb-3`}>
                                        <p>$10,000-$25,000</p>
                                        <h3>BAMBA Swim Campaign</h3>
                                </div>
                                    <button onClick={onClose} className={"btn-black btn-close"}>
                                        <i className="fa fa-times"></i>
                                    </button>
                            </div>
                            
                            <p>At Pacific Interlude, we are dedicated to capturing the essence of a brand through visually striking campaigns. For our recent project with Bamba Swim, an Australian women's swimwear brand, we helped the brand bring back the nostalgia of the 80s. <span className="text-darkgreen">This rebrand increased their engagement and therefore grew sales.</span></p>


                            <p>Our team scouted models that embodied the retro 80s feel, and <span className="text-green">through various connections, we were able to</span> book an exquisite house located in Calabasas, California, which served as the perfect location to encapsulate the 80s aesthetic the brand was going for.</p>


                            <p>We went all out with the styling, utilizing hot lighting styles, with vintage props, hair, and makeup to make it as true to the decade as possible. We also were able to creatively direct this campaign with <span className="text-darkgreen">Bamba’s team all the way in Australia. Our attention to detail allowed them to trust us in full.</span></p>


                            <p>The entire campaign was shot on a combination of 35mm film and VHS to give it a retro feel that was in line with the brand's aesthetic.</p>

                            <p>The final campaign was a visual feast, perfectly capturing the essence of Bamba Swim and the nostalgia of the 80s.</p>


                            <p>When you choose Pacific Interlude, you can trust us to elevate your brand and make it stand out, <span className="text-green">while having your ROI in mind.</span></p>
                                                
                        </div>
                    </div>
                    )}


                    {setWhatModalOpen == '3' && (
                    <div className={`d-flex flex-column mb-3`}>
                        <div className={`d-flex flex-column`}>
                            <div className={`d-flex justify-content-between`}>
                        
                                <div className={`d-flex flex-column mb-3`}>
                                        <p>$25,000-$50,000:</p>
                                        <h3>Nike Swim Campaign</h3>
                                </div>
                                    <button onClick={onClose} className={"btn-black btn-close"}>
                                        <i className="fa fa-times"></i>
                                    </button>
                            </div>
                            
                            

                            <p><span className="text-darkgreen">At Pacific Interlude, we specialize in delivering a comprehensive suite of production services to bring your creative vision to fruition.</span> For our recent project with Nike Swim, our team curated an unforgettable experience on a small island in the Caribbean, St. Lucia.</p>


                            <p>A destination that served as the perfect backdrop for the campaign. We carefully selected models that best represented the brand and crafted a budget that maximized the production value.</p>


                            <p>During the shoot, our team skillfully captured photo and video content, and in post-production, we edited and color-corrected the footage to perfection.</p>


                            <p>Our creative direction and styling brought everything together, elevating the final product to exceed the brand's expectations. <span className="text-green">Nike was able to be hands-off for the whole production by instilling trust in us to execute polished content, without them having to lift a finger.</span></p>


                            <p>It was a great team effort from our Los Angeles based team, who flew out to the Caribbean to make it happen.</p>


                            <p>If you're in need of a production partner that can bring your ideas to life, trust Pacific Interlude to take your project to the next level.</p>
                                                
                        </div>
                    </div>
                    )}
                    

                    {setWhatModalOpen == '5' && (
                    <div className={`d-flex flex-column mb-3`}>
                        <div className={`d-flex flex-column`}>
                        
                            <h2>What is Lorem Ipsum?</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <iframe src="https://player.vimeo.com/video/786409737?h=03eb78f971" width="690" height="460" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                            <h2>Where does it come from?</h2>
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                        </div>
                        <div>asd</div>
                    </div>
                    )}

                {setWhatModalOpen == 'sent' && (
                    <div className={`d-flex flex-column mb-3`}>
                        
                        <div className={`d-flex justify-content-between`}>
                        
                                <div className={`d-flex flex-column mb-3`}>
                                        <p>Success</p>
                                        <h3>Inquiry sent!</h3>
                                </div>
                                    <button onClick={onClose} className={"btn-black btn-close"}>
                                        <i className="fa fa-times"></i>
                                    </button>
                        </div>
                        <div className={`d-flex flex-column`}>
                            <p>We have received your inquiry and will get back to you shortly to discuss further.</p>
                            
                            <p>Thank you for inquiring about working with Pacific Interlude. We look forward to the opportunity to work with you.</p>
                           
                        </div>

                    </div>
                    )}
               
                        </>
                )}
                </div>
          
                
        </Modal>
    );
    
};

