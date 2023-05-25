import { markdown } from "markdown";
import { EVENTS } from "../constants";
import Events from "../events";

export default class ElmProjects extends HTMLElement {
  constructor() {
    super();
    this.init_spinner();

    this.get_data((data) => {
      Events.send(EVENTS.elm_projects_length, data.length);
      this.init_elm(data)
    })
  };

  get_data(block) {
    let data = [{
      name: "Edu Game",
      description: "![edu_game_01](https://github.com/filipvrba/edu-game-rjs/raw/main/docs/public/png/edu_game_01.png)\nA brief description of the MRuby functionality, a vital component of the Edu Game project.",
      category: "Game",
      url: "https://github.com/filipvrba/edu-game-rjs",
      last_change: "1684956786"
    }];

    if (block) block(data)
  };

  init_elm(data) {
    let l_acc_item = () => {
      let result = "";

      if (data.length == 0) {
        result = `${`
        <div class='text-center'>
          <p class='h4 text-muted'>no projects found</p>
        </div>
        `}`
      };

      for (let i = 0; i < data.length; i++) {
        let project = data[i];
        let template = `${`
        <div class='accordion-item'>
          <h2 class='accordion-header' id='heading_${i}'>
            <button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapse_${i}' aria-expanded='false' aria-controls='collapse_${i}'>
              <p class='h5 mb-0'>${project.name}</p>
            </button>
          </h2>
          <div id='collapse_${i}' class='accordion-collapse collapse' aria-labelledby='heading_${i}' data-bs-parent='#accordionProjects'>
            <div class='accordion-body'>
              
            <div class='mb-3'>
              <div class='row g-0'>
                <div class='container'>
                  <div class='card-body'>
                    <div class='md-html card-text'>${markdown.toHTML(project.description)}</div>
                    <div class='row g-0'>
                      <div class='col-6' style='margin-top: auto; margin-bottom: auto;'>
                        <p class='card-text'><small class='text-muted'>${project.category} | ${Number(project.last_change).to_date()}</small></p>
                      </div>
                      <div class='col-6 text-center'>
                        <a href='${project.url}' target='_blank' class='btn btn-primary card-text'>See details</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            </div>
          </div>
        </div>
        `}`;
        result += `${template}\n`
      };

      return result
    };

    let template = `${`
    <div class='accordion mx-auto col-lg-9' id='accordionProjects'>
      ${l_acc_item.call()}
    </div>
    `}`;
    this.innerHTML = template
  };

  init_spinner() {
    this.innerHTML = "<elm-spinner></elm-spinner>"
  }
}