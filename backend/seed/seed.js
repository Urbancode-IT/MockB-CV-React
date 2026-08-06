const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const logger = require("../utils/logger");


require("dotenv").config();

const connectDB = require("../config/db");
const Template = require("../models/Template");

const seed = async () => {

    try {

        await connectDB();

        const html = fs.readFileSync(

            path.join(__dirname, "../template.html"),

            "utf8"

        );

        const existing = await Template.findOne({

            title: "Modern Resume"

        });

        if (existing) {

            existing.htmlContent = html;

            await existing.save();

            logger.info("✅ Template Updated");

        }

        else {

            await Template.create({

                title: "Modern Resume",

                description: "Professional ATS Friendly Resume",

                htmlContent: html,

                tags: [

                    "ATS",

                    "Modern"

                ]

            });

            console.log("✅ Template Created");

        }

        process.exit();

    }

    catch (error) {

logger.error(error);    
    process.exit(1);

    }

};

seed();