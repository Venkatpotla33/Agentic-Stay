# 🏡 Agentic-Stay – AI-Powered Homestay Discovery Platform

### Discover stays differently. Travel more meaningfully.

Agentic-Stay is an AI-powered homestay discovery prototype that explores how artificial intelligence can make accommodation discovery easier and more conversational.

Instead of relying only on traditional search filters, users can describe their travel requirements in everyday language and receive AI-generated accommodation suggestions with details such as location, pricing, amenities, descriptions, and supporting search sources.

The broader vision is to build a travel ecosystem that connects travellers, homestay owners, and local communities while helping people discover unique local experiences.

---

## 🎯 Project Objective

The idea behind Agentic-Stay is to explore how AI can simplify the way people discover accommodation.

Traditional accommodation searches often require users to apply multiple filters and browse through numerous listings.

I wanted to experiment with a more natural approach where users simply describe what they are looking for and receive relevant suggestions through an AI-powered interface.

---

## ✨ Key Features

* **Natural Language Search:** Search for accommodation using everyday language instead of relying entirely on traditional filters.
* **AI-Powered Recommendations:** Uses Google Gemini to generate accommodation suggestions based on user requirements.
* **Google Search Grounding:** Integrates Google Search grounding to retrieve supporting web references for AI-generated responses.
* **Structured Accommodation Results:** Displays property names, locations, estimated prices, ratings, amenities, and descriptions.
* **AI Image Generation:** Uses Google Imagen 3 to generate accommodation-related visuals based on image keywords.
* **Interactive Listing Cards:** Presents accommodation suggestions in a user-friendly interface.
* **Google Maps Integration:** Provides links to search for displayed locations on Google Maps.
* **Source References:** Displays available search-grounding sources alongside the results.
* **Error Handling:** Includes loading indicators and error messages for search and response-processing failures.

---

## ⚙️ Technology Stack

| Technology               | Purpose                            |
| ------------------------ | ---------------------------------- |
| React 19                 | Frontend development               |
| TypeScript               | Application logic and type safety  |
| Vite                     | Development server and build tool  |
| Google Gemini API        | AI-powered travel query processing |
| Gemini 2.5 Flash Preview | Language model                     |
| Google Search Grounding  | Supporting web search references   |
| Google Imagen 3          | AI image generation                |
| Tailwind CSS             | UI styling                         |
| Node.js & npm            | Development environment            |

---

## 🔄 Application Workflow

1. **User Input:** The user enters a travel-related request in natural language.

2. **Request Handling:** The React application receives the query and manages the loading and error states.

3. **AI Processing:** The Gemini service sends the query to Google's Gemini API with a travel-assistant system instruction.

4. **Search Grounding:** Google Search grounding is enabled to provide supporting web references.

5. **Response Generation:** Gemini is instructed to generate 3–6 accommodation suggestions in a structured JSON format.

6. **Response Processing:** The application parses the generated JSON and performs basic validation of required fields.

7. **Result Presentation:** The application displays the accommodation suggestions through interactive React components.

8. **Image Generation:** Google Imagen 3 generates accommodation-related visuals using the supplied image keywords.

9. **Source Display:** Available grounding references are displayed so users can explore the supporting sources.

---

## 🏗️ Project Structure

```text
Agentic-Stay/
│
├── components/
│   ├── Header.tsx
│   ├── ChatInput.tsx
│   ├── ListingCard.tsx
│   ├── LoadingSpinner.tsx
│   ├── WelcomeScreen.tsx
│   ├── ErrorDisplay.tsx
│   ├── SourcesDisplay.tsx
│   └── icons.tsx
│
├── services/
│   └── geminiService.ts
│
├── App.tsx
├── index.tsx
├── index.html
├── types.ts
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js
* npm
* Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/Venkatpotla33/Agentic-Stay.git
```

### 2. Navigate to the project

```bash
cd Agentic-Stay
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the API key

Create a `.env.local` file in the project root and configure the API key according to the environment variable expected by the Gemini service.

```env
API_KEY=your_gemini_api_key
```

### 5. Start the development server

```bash
npm run dev
```

Open the local development URL displayed in your terminal.

### 6. Build the application

```bash
npm run build
```

---

## 🧠 What I Learned

Through this project, I explored:

* Integrating generative AI APIs into a frontend application.
* Using natural-language input to build an AI-powered search experience.
* Working with Google Search grounding.
* Processing and validating structured AI responses.
* Building reusable React components with TypeScript.
* Integrating AI-based image generation.
* Handling asynchronous API requests, loading states, and errors.
* Connecting different services to create a complete user-facing prototype.

---

## 🔮 Future Improvements

The current project is a prototype, and there is plenty of scope to develop it further.

Some ideas I would like to explore:

* Connecting directly with homestay owners and accommodation providers.
* Improving the reliability and verification of accommodation listings.
* Adding user preferences and personalised recommendations.
* Introducing availability and booking integrations.
* Discovering local activities, food, culture, and community experiences.
* Developing a more complete AI-powered travel assistant.

---

## 👨‍💻 Developed By

**Venkat Potla**

M.Tech Data Science | AI & Data Science Enthusiast

* GitHub: https://github.com/Venkatpotla33
* LinkedIn: https://www.linkedin.com/in/venkatpotla33

---

*Agentic-Stay is an independently developed prototype exploring the possibilities of AI-powered accommodation discovery and community-connected travel.*


# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
