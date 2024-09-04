
const CARD_OPTIONS ={

style:{
    
base:{

iconColor:"#ccc",
color:"#000",
fontWeight:400,
fontFamily:"Roboto, Open Sans, Segoe UI, sans-serif",
fontSize:"14px",
fontSmoothing:"antialiased",
":-webkit-autofill":{color:"#ccc"},
"::placeholder":{color:"#3b83bd"},
backgroundColor:"#fff",



}, 
invalid: {
iconColor:"#e5424d",
color:"#e5424d"

}

}

}

const assessmentAnswerOptions = [
    {
      questionId: 1,
      questionText: "How would you describe your menstrual pattern?",
      responses: [
        { text: "I have irregular menstrual cycles (either too long or too short)", points: 3 },
        { text: "My periods are consistently regular", points: 0 },
        { text: "I have no periods at all", points: 3 },
      ],
      healthFact: "The incidence of PCOS is significantly associated with irregular menstruations."
    },
    {
      questionId: 2,
      questionText: "Have you noticed excess hair growth, especially on your face?",
      responses: [
        { text: "Yes", points: 3 },
        { text: "No", points: 0 },
      ]
    },
    {
      questionId: 3,
      questionText: "Have you noticed excessively oily skin or increased adult acne?",
      responses: [
        { text: "Yes", points: 3 },
        { text: "No", points: 0 },
      ]
    },
    {
      questionId: 4,
      questionText: "Have you experienced unexplained weight gain, especially around your abdomen?",
      responses: [
        { text: "Yes", points: 3 },
        { text: "No", points: 0 },
      ]
    },
    {
      questionId: 5,
      questionText: "Have you noticed significant hair thinning or hair loss, especially at the crown of your head?",
      responses: [
        { text: "Yes", points: 3 },
        { text: "No", points: 0 },
      ]
    },
    {
      questionId: 6,
      questionText: "Do you have patches of darkened skin, especially around your neck, groin, or underarms?",
      responses: [
        { text: "Yes", points: 3 },
        { text: "No", points: 0 },
      ]
    },
    {
      questionId: 7,
      questionText: "Have you been trying to conceive unsuccessfully for more than 6 months?",
      responses: [
        { text: "Yes", points: 3 },
        { text: "No", points: 0 },
        { text: "Not Applicable", points: 0 },
      ]
    },
    {
      questionId: 8,
      questionText: "Do you have a family history of PCOS?",
      responses: [
        { text: "Yes, my mum", points: 3 },
        { text: "Yes, my sister", points: 3 },
        { text: "Yes, other family member", points: 1 },
        { text: "No", points: 0 },
      ]
    },
    {
      questionId: 9,
      questionText: "Do you experience sugar cravings, especially after a meal?",
      responses: [
        { text: "Yes", points: 1 },
        { text: "No", points: 0 },
      ]
    },
    {
      questionId: 10,
      questionText: "Have you been diagnosed with insulin resistance or have elevated blood sugar levels?",
      responses: [
        { text: "Yes", points: 3 },
        { text: "No", points: 0 },
      ],
      healthFact: "Insulin resistance was detected in 60 - 80% of both obese and nonobese women with PCOS."
    },
    {
      questionId: 11,
      questionText: "How would you describe your sleep?",
      responses: [
        { text: "I frequently experience sleep disturbances.", points: 3 },
        { text: "I have occasional sleep disturbances.", points: 1 },
        { text: "I sleep well and I feel rested in the morning.", points: 0 },
      ],
      healthFact: "When PCOS patients were asked about trouble falling asleep, interrupted sleep, or sleeping more than usual, 23.2% said that they suffered from them nearly every day."
    },
    {
      questionId: 12,
      questionText: "Do you often feel fatigued, even after adequate rest?",
      responses: [
        { text: "Yes", points: 1 },
        { text: "No", points: 0 },
      ],
      healthFact: "Most of the PCOS patients report that they feel tired or having little energy."
    },
    {
      questionId: 13,
      questionText: "Do you frequently experience digestive issues such as bloating, constipation, or diarrhea?",
      responses: [
        { text: "Yes", points: 1 },
        { text: "No", points: 0 },
      ]
    },
  ];
  






export {CARD_OPTIONS,assessmentAnswerOptions  }