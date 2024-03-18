import Joi from "joi";
import judge0 from "../services/judge0.service.js";
import { Submission } from "../models/index.js";

const submission = {
  async executeCode(req, res, next) {
    const submissionSchema = Joi.object({
      username: Joi.string().required(),
      language: Joi.string().required(),
      stdin: Joi.string().allow(''),
      sourceCode: Joi.string().required(),
    });

    const { error } = submissionSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { username, language, stdin, sourceCode } = req.body;

    // Map your language to Judge0 language ID
    const languageId = {
      cpp: 54, // Example: C++ language ID
      java: 62, // Example: Java language ID
      js: 63, // Example: JavaScript language ID
      python: 71, // Example: Python language ID
    }[language];

    const data = {
      source_code: sourceCode,
      stdin: stdin,
      language_id: languageId,
    };
    try {
        const response = await judge0.post("/submissions", data, {
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
            },
        });
        
        const { token } = response.data;
  
        // Polling Judge0 for the result
        const checkResult = async () => {
          try {
            const resultResponse = await judge0.get(`/submissions/${token}?base64_encoded=false&fields=stdout,stderr,status_id,language_id`);
            const { stdout, stderr, status_id } = resultResponse.data;
            
  
            // Check if the status_id indicates that the process is finished
            if (status_id === 3 || status_id > 3) { // status_id 3 means 'Accepted', other codes indicate different statuses
              // If there's an error message in stderr, it's likely a compilation error
              if (stderr) {
                
                res.json({ error: stderr });
              } else {
                // Save the successful output and return it
                const saveItem = new Submission({
                  username,
                  language,
                  stdin,
                  sourceCode,
                  codeOutput: stdout
                });
                
                const savedItem = await saveItem.save();
                res.json({ output: stdout });
              }
            } else {
              // If not finished, check again after a delay
              setTimeout(checkResult, 2000); // Check every 2 seconds
            }
          } catch (err) {
            // Handle any errors that occur during the execution
            if (err.response) {
              res.status(500).json({ error: err.response.data });
            } else {
              res.status(500).json({ error: err.message });
            }
          }
        };
  
        // Start the polling
        checkResult();
      } catch (err) {
        // Handle errors that occur during the initial request to Judge0
        if (err.response) {
          res.status(500).json({ error: err.response.data });
        } else {
          res.status(500).json({ error: err.message || 'Some Internal Error' });
        }
      }
    },
    async getSubmissions(req, res, next) {
        try {
          const documents = await Submission.find().lean().select('-__v -_id');
          const modifiedDocuments = documents.map(doc => {
            // Limit the sourceCode to the first 100 characters
            doc.sourceCode = doc.sourceCode.substring(0, 100);
      
            // Convert createdAt to IST and format it
            doc.createdAt = new Date(doc.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      
            return doc;
          });
      
          res.json(modifiedDocuments);
        } catch (err) {
          return next(err);
        }
      }
  };
  
  export default submission;