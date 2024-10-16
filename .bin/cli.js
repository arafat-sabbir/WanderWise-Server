#!/usr/bin/env node

const [, , command, ...args] = process.argv;

import fs from 'fs';
import { program } from 'commander';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Define color codes for console output
const GREEN = '\x1b[32m'; // Green color
const BLUE = '\x1b[34m'; // Blue color
const RESET = '\x1b[0m'; // Reset color

// Regular expression to check for special characters
const specialCharRegex = /[0-9!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\-=\s]/g;

// Helper function to capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper function to convert string to camelCase after replacing unwanted characters with hyphens
function toCamelCase(str) {
  // Replace all non-alphabetic characters (except hyphens) with hyphens
  const hyphenatedStr = str.replace(/[^a-zA-Z]+/g, '-').replace(/^-+|-+$/g, '');

  // Convert hyphenated string to camelCase
  return hyphenatedStr
    .split('-') // Split the string by hyphens
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(''); // Join all words together without hyphens
}

if (command === 'resource') {
  // Command-line options setup
  program
    .version('1.0.0') // Version of the CLI tool
    .description('Generate route, model, controller, and interface files for a new resource') // Description of the tool
    .argument('<name>', 'Resource name') // Argument for resource name
    .action((name) => {
      const resourceName = !specialCharRegex.test(args[0])
        ? args[0].toLowerCase()
        : toCamelCase(args[0]);

      const capitalizedResourceName = capitalize(resourceName);

      // Path to the route directory
      const routeDir = path.join(__dirname, '..', 'src', 'app', 'modules', args[0]);
      // Path to the controller directory
      const controllerDir = path.join(__dirname, '..', 'src', 'app', 'modules', args[0]);
      // Path to the interface directory
      const interfaceDir = path.join(__dirname, '..', 'src', 'app', 'modules', args[0]);
      // Path to the model directory
      const modelsDir = path.join(__dirname, '..', 'src', 'app', 'modules', args[0]);
      // Path to the validation directory
      const validationDir = path.join(__dirname, '..', 'src', 'app', 'modules', args[0]);
      // Path to the service directory
      const serviceDir = path.join(__dirname, '..', 'src', 'app', 'modules', args[0]);

      // Function to format file paths relative to project root
      const formatPath = (filePath) => path.relative(path.join(__dirname, '..'), filePath);

      // Create the resource directories if they don't exist
      [routeDir, controllerDir, modelsDir, interfaceDir].forEach((dir) => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      });

      // Create route file content
      const routeContent = `
// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { ${resourceName}Controllers } from './${resourceName}.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ${resourceName}Validation } from './${resourceName}.validation';


// Initialize router
const router = Router();

router.post("/create-${resourceName}",validateRequest(${resourceName}Validation.create${capitalizedResourceName}Schema), ${resourceName}Controllers.create${capitalizedResourceName});

const ${resourceName}Routes = router;
export default ${resourceName}Routes;
    `;

      // Path to the route file
      const routeFilePath = path.join(routeDir, `${args[0]}.route.ts`);
      // Write content to the route file
      fs.writeFileSync(routeFilePath, routeContent.trim());

      // Create controller file content
      const controllerContent = `
import { Request, Response } from 'express';
import { ${resourceName}Services } from './${args[0]}.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single ${capitalizedResourceName}.
const create${capitalizedResourceName} = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new ${args[0]} and get the result
  const result = await ${resourceName}Services.create${capitalizedResourceName}(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New ${capitalizedResourceName} created Successfully',
    data: result,
  });
});



// Controller function to handle the retrieval of a single ${args[0]} by ID.
 const getSingle${capitalizedResourceName} = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the ${args[0]} by ID and get the result
  const result = await ${resourceName}Services.get${capitalizedResourceName}ById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: '${capitalizedResourceName} Retrieved Successfully',
    data: result,
  });
});


// Controller function to handle the retrieval of multiple ${args[0]}.
 const getAll${capitalizedResourceName} = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple ${args[0]} based on query parameters and get the result
  const result = await ${resourceName}Services.getAll${capitalizedResourceName}(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: '${capitalizedResourceName}s Retrieved Successfully',
    data: result,
  });
});


export const ${resourceName}Controllers = {
  create${capitalizedResourceName},
  getSingle${capitalizedResourceName},
  getAll${capitalizedResourceName},
}
    `;

      // Path to the controller file
      const controllerFilePath = path.join(controllerDir, `${args[0]}.controller.ts`);
      // Write content to the controller file
      fs.writeFileSync(controllerFilePath, controllerContent.trim());

      // Create model content
      const modelContent = `
import mongoose, { Schema } from 'mongoose';
import { T${capitalizedResourceName} } from './${resourceName}.interface';

// Define an interface representing a ${capitalizedResourceName} document

// Define the ${capitalizedResourceName} schema
const ${capitalizedResourceName}Schema: Schema<T${capitalizedResourceName}> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the ${capitalizedResourceName} model
const ${capitalizedResourceName}Model = mongoose.model<T${capitalizedResourceName}>('${capitalizedResourceName}', ${capitalizedResourceName}Schema);

// Export the ${capitalizedResourceName} model
export default ${capitalizedResourceName}Model;
    `;

      // Path to the model file
      const modelFilePath = path.join(modelsDir, `${args[0]}.model.ts`);
      // Write content to the model file
      fs.writeFileSync(modelFilePath, modelContent.trim());

      // Create interface file content
      const interfaceContent = `

export interface T${capitalizedResourceName} {
  // Add fields as needed
}
    `;

      // Path to the interface file
      const interfaceFilePath = path.join(interfaceDir, `${args[0]}.interface.ts`);
      // Write content to the interface file
      fs.writeFileSync(interfaceFilePath, interfaceContent.trim());

      // Create Zod validation schema content
      const validationContent = `
  import { z } from "zod";

// Validation Schema For create${capitalizedResourceName}
const create${capitalizedResourceName}Schema = z.object({
  body:z.object({

  })
})

export const ${resourceName}Validation = {
  create${capitalizedResourceName}Schema
}
    `;

      // Path to the zod validation file
      const validationFilePath = path.join(validationDir, `${args[0]}.validation.ts`);
      // Write content to the validation file
      fs.writeFileSync(validationFilePath, validationContent.trim());

      // Create service content
      const serviceContent = `
// Import the model
import ${capitalizedResourceName}Model from './${args[0]}.model'; 

// Service function to create a new ${resourceName}.
const create${capitalizedResourceName} = async (data: object) => {
  const new${capitalizedResourceName} = await ${capitalizedResourceName}Model.create(data);
  return new${capitalizedResourceName};
};


// Service function to retrieve a single ${resourceName} by ID.
const get${capitalizedResourceName}ById = async (id: string) => {
  return await ${capitalizedResourceName}Model.findById(id);
};

// Service function to retrieve multiple ${resourceName} based on query parameters.
const getAll${capitalizedResourceName} = async (query: object) => {
  return await ${capitalizedResourceName}Model.find(query);
};

export const ${resourceName}Services = {
  create${capitalizedResourceName},
  get${capitalizedResourceName}ById,
  getAll${capitalizedResourceName},
};

    `;
      // Path to the service file
      const serviceFilePath = path.join(serviceDir, `${args[0]}.service.ts`);
      // Write content to the service file
      fs.writeFileSync(serviceFilePath, serviceContent.trim());

      // Log the creation of the controller, interface, model , route, service & validation files
      console.log(
        `${GREEN}CREATE ${RESET}${formatPath(controllerFilePath)} ${BLUE}(${Buffer.byteLength(
          controllerContent,
          'utf8'
        )} bytes)`
      );
      console.log(
        `${GREEN}CREATE ${RESET}${formatPath(interfaceFilePath)} ${BLUE}(${Buffer.byteLength(
          interfaceContent,
          'utf8'
        )} bytes)`
      );
      console.log(
        `${GREEN}CREATE ${RESET}${formatPath(modelFilePath)} ${BLUE}(${Buffer.byteLength(
          modelContent,
          'utf8'
        )} bytes)`
      );
      console.log(
        `${GREEN}CREATE ${RESET}${formatPath(routeFilePath)} ${BLUE}(${Buffer.byteLength(
          routeContent,
          'utf8'
        )} bytes)`
      );
      console.log(
        `${GREEN}CREATE ${RESET}${formatPath(serviceFilePath)} ${BLUE}(${Buffer.byteLength(
          serviceContent,
          'utf8'
        )} bytes)`
      );
      console.log(
        `${GREEN}CREATE ${RESET}${formatPath(validationFilePath)} ${BLUE}(${Buffer.byteLength(
          validationContent,
          'utf8'
        )} bytes)`
      );
    });

  program.parse(process.argv);
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}

