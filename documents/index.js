
 const format = (pdfData) => {
    //  console.log('pdf'+pdfData)
    let ExperiencesHtml = ``;
    pdfData.Experiences.forEach(experience => {
       ExperiencesHtml+=`<section class="blocks">`;
       ExperiencesHtml+=`<div class="date">`;
         ExperiencesHtml+=`<span>`+experience.SDate+`</span> - <span>`+experience.EDate+`</span>`;
       ExperiencesHtml+=`</div>`;
       ExperiencesHtml+=`<div class="decorator">`;
       ExperiencesHtml+=`</div>`;
       ExperiencesHtml+=`<div class="details">`;
        ExperiencesHtml+=` <header>`;
           ExperiencesHtml+=`<h3>`+experience.Title+`</h3>`;
           ExperiencesHtml+=`<span class="place">`+experience.Workplace+`</span>`;
           ExperiencesHtml+=`<span class="location">`+experience.WorkplaceAdd+`</span>`;
         ExperiencesHtml+=`</header>`;
         ExperiencesHtml+=`<div>`;
          ExperiencesHtml+=` <ul>`;
            ExperiencesHtml+=` <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>`;
            ExperiencesHtml+=` <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec mi ante. Etiam odio eros, placerat eu metus id, gravida eleifend odio. Vestibulum dapibus pharetra odio, egestas ullamcorper ipsum congue ac. Maecenas viverra tortor eget convallis vestibulum. Donec pulvinar venenatis est, non sollicitudin metus laoreet sed. Fusce tincidunt felis nec neque aliquet porttitor</li>`;
           ExperiencesHtml+=`</ul>`;
           ExperiencesHtml+=`</div>`;
       ExperiencesHtml+=`</div>`;
     ExperiencesHtml+=`</section>`;
    });

    let ProjectsHtml = ``;
    pdfData.Projects.forEach(project => {
      ProjectsHtml+=`<section class="blocks">`;
      ProjectsHtml+=`<div class="date">`;
      ProjectsHtml+=`    <span>`+project.SDate+`</span> - <span>`+project.EDate+`</span>`;
      ProjectsHtml+=`</div>`;
      ProjectsHtml+=`<div class="decorator">`;
      ProjectsHtml+=`</div>`;
      ProjectsHtml+=`<div class="details">`;
      ProjectsHtml+=`    <header>`;
      ProjectsHtml+=`    <h3>`+project.ProjectName+`</h3>`;
      ProjectsHtml+=`    <span class="place">Some workplace</span>`;
      ProjectsHtml+=`    </header>`;
      ProjectsHtml+=`    <div>`;
      ProjectsHtml+=`    <ul>`;
      ProjectsHtml+=`        <li>`+project.Description+`</li>`;
      ProjectsHtml+=`    </ul>`;
      ProjectsHtml+=`    </div>`;
      ProjectsHtml+=`</div>`;
      ProjectsHtml+=`</section>`;
    });

    let EducationsHtml = ``;
    pdfData.Educations.forEach(education => {
      EducationsHtml+=`<section class="blocks">`;
      EducationsHtml+=`    <div class="date">`;
      EducationsHtml+=`      <span>`+education.SDate+`</span> - <span>`+education.EDate+`</span>`;
      EducationsHtml+=`    </div>`;
      EducationsHtml+=`    <div class="decorator">`;
      EducationsHtml+=`    </div>`;
      EducationsHtml+=`    <div class="details">`;
      EducationsHtml+=`      <header>`;
      EducationsHtml+=`        <h3>`+education.Program+`</h3>`;
      EducationsHtml+=`        <span class="place">`+education.Institude+`</span><br></br>`;
      EducationsHtml+=`        <span class="location">Some City, Some Country</span>`;
      EducationsHtml+=`      </header>`;
      EducationsHtml+=`      <div>`+education.MarksObtained+`</div>`;
      EducationsHtml+=`    </div>`;
      EducationsHtml+=`  </section>`;
    });

    let EmailId = pdfData.Profiles[0].EmailId != null ? `<li><i class="fa fa-envelope"></i>`+pdfData.Profiles[0].EmailId+`</li>` : null;
    let ContactNumber = pdfData.Profiles[0].ContactNumber != null ? `<li><i class="fa fa-phone"></i>`+ pdfData.Profiles[0].ContactNumber+`</li>` : null;

    let skillsHtml = ``;
    pdfData.Skills.forEach(skill => {
      skillsHtml +=`<li>`+skill.skill+`</li>`;
    });

return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
       </head>
       <body>
       <div class="portfolio">
       <section id="main" >
       <header id="title">
       <h1>`+pdfData.Profiles[0].Fname +` `+ pdfData.Profiles[0].Mname +` `+ pdfData.Profiles[0].Lname+`</h1>
         <span class="subtitle">`+pdfData.Profiles[0].JobTitle+`</span>
       </header>
        `+ExperiencesHtml+`
      </section>
       <section class="main-block">
         <h2>
           <i class="fa fa-folder-open"></i> Selected Projects
         </h2>
         `+ProjectsHtml+`
       </section>
       <section class="main-block concise">
         <h2>
           <i class="fa fa-graduation-cap"></i> Education
         </h2>
         `+EducationsHtml+`
       </section>
     <aside id="sidebar">
       <div class="side-block" id="contact">
         <h1>
           Contact Info
         </h1>
         <ul>
           `+EmailId+`
           `+ContactNumber+`
         </ul>
       </div>
       <div class="side-block" id="skills">
         <h1>
           Skills
         </h1>
         `+skillsHtml+`
       </div>
     </aside>
       </div>
       </body>
    </html>
    `;
};

export default format;