# Resume Converter

## Project Overview

This project is a web application that converts PDF resumes into well-formatted HTML documents using various Language Learning Models (LLMs) including OpenAI's GPT-3.5, Anthropic's Claude, and Google's Gemini.

## My Journey

As someone with limited frontend development experience, this project presented an exciting challenge. Here's how I approached it:

1. **Initial Prototype**: I started by creating a basic prototype using Google Colab, a cloud-based platform for coding and data analysis. This allowed me to visualize the user interface and basic functionality without diving deep into frontend technologies.

2. **Learning and Adaptation**: With the prototype as a guide, I began learning the necessary frontend technologies, including React and Next.js. This was a steep learning curve, but it allowed me to understand how to structure a web application properly.

3. **Integration of LLMs**: One of the most interesting aspects of this project was integrating multiple LLM services. I worked on incorporating:
    - OpenAI's GPT-3.5
    - Anthropic's Claude
    - Google's Gemini

    Each of these required understanding their respective APIs and how to use them effectively for resume parsing and HTML generation.

4. **Serverless Architecture**: Given my limited backend experience, I opted for a serverless architecture using Vercel. This decision simplified deployment and scaling concerns, allowing me to focus more on the application's core functionality.

5. **Continuous Learning**: Throughout the development process, I constantly learned new concepts, best practices, and how to troubleshoot various issues. This project has been a significant learning experience in full-stack development.

## Features

- Upload PDF resumes
- Convert PDFs to HTML using different LLMs (GPT-3.5, Claude, Gemini)
- Download the generated HTML
- Preview the generated HTML within the application

## Technologies Used

- Next.js
- React
- Chakra UI
- OpenAI API
- Anthropic API
- Google Generative AI API

## Running the Project

To run this project locally:

1. Clone the repository:
    ```
    git clone https://github.com/anikethhebbar/resume-converter.git
    cd resume-converter
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Create a `.env.local` file in the root directory and add your API keys:
    ```
    OPENAI_API_KEY=your_openai_api_key
    ANTHROPIC_API_KEY=your_anthropic_api_key
    GOOGLE_API_KEY=your_google_api_key
    ```

4. Run the development server:
    ```
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is set up for easy deployment on Vercel. Follow these steps:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Sign up for a Vercel account and connect your repository.
3. Vercel will automatically detect the Next.js project and set up the build configuration.
4. Add your environment variables (API keys) in the Vercel project settings.
5. Deploy the project.

## Lessons Learned

This project has been a tremendous learning experience. Some key takeaways include:

- The importance of prototyping to visualize the end product
- How to integrate and work with multiple AI services in a single application
- The benefits and challenges of serverless architectures
- The power of React and Next.js for building modern web applications


## Conclusion

This project has been a journey from having limited frontend knowledge to creating a functional, AI-powered web application. It demonstrates the power of modern web technologies and AI services, and how they can be combined to create useful tools.
