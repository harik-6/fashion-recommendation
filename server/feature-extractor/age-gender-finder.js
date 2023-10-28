const { exec } = require('child_process');
const path = require('path');

async function detectAgeAndGender(image_path) {
  console.log('Detecing age and gender...')
  const cmd = `cd ${path.join(__dirname, 'gender-age-py-detector')} && python detect.py --image ${image_path}`;
  console.log(`Executing command ${cmd}`);
  return new Promise((resolve, reject) => {
    return exec(cmd, (error, stdout, stderr) => {
      try {
        if (error) {
          return reject(`error: ${error.message}`);
        }
        if (stderr) {
          return reject(`stderr: ${stderr}`);
        }
        if (stdout.includes("No")) {
          console.log('No face detected to find age and gender')
          return resolve({
            age: 'N/A',
            gender: 'N/A'
          })
        }
        let output = stdout.split("\n");
        const genderString = output[0];
        const ageString = output[1]
        const gender = genderString.split(": ")[1]
        const ageRange = ageString.split(": ")[1].split(" ")[0].split("-");
        const age = (parseInt(ageRange[1]) - parseInt(ageRange[0])) / 2;
        return resolve({
          gender,
          age: parseInt(age)
        });
      } catch (exec_error) {
        return reject(`error in processing ${exec_error}`)
      }
    });
  })
}


module.exports = detectAgeAndGender;