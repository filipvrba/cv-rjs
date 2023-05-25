import { EVENTS } from "../constants";
import Events from "../events";

export default class ElmArticles extends HTMLElement {
  constructor() {
    super();
    this.init_spinner();

    this.get_data((data) => {
      Events.send(EVENTS.elm_articles_length, data.length);
      this.init_elm(data)
    })
  };

  get_data(block) {
    let data = [{
      id: "1",
      name: "Edu Game | Project development",
      description: "What goes into creating a smaller project that is a game for education, for individuals, looking to master the Ruby programming language. The development process is described in this article.",
      url: "https://github.com/filipvrba/edu-game-rjs/blob/main/docs/en-edu_develop.md",
      project: "Edu Game",
      project_url: "https://github.com/filipvrba/edu-game-rjs",
      created_at: "1684956786"
    }];

    if (block) block(data)
  };

  init_elm(data) {
    let l_acc_item = () => {
      let result = "";

      if (data.length == 0 || data[0].id == -1) {
        result = `${`
        <div class='text-center'>
          <p class='h4 text-muted'>no articles found</p>
        </div>
        `}`;
        return result
      };

      for (let i = 0; i < data.length; i++) {
        let article = data[i];
        let article_id = `${article.id}-${article.name.url_form()}`;
        let template = `${`
          <div id='${article_id}' class='accordion-item'>
            <h2 class='accordion-header' id='heading_${article_id}'>
              <button id='button_${article_id}' class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapse_${article_id}' aria-expanded='false' aria-controls='collapse_${article_id}'>
                <p class='h5 mb-0'>${article.name}</p>
              </button>
            </h2>
            <div id='collapse_${article_id}' class='accordion-collapse collapse' aria-labelledby='heading_${article_id}' data-bs-parent='#accordionArticles'>
              <div class='accordion-body'>
                
                <div class='mb-3'>
                  <div class='row g-0'>
                    <div class='container'>
                      <div class='card-body'>
                        <p class='card-text'>${article.description}</p>
                        <div class='row g-0'>
                          <div class='col-6' style='margin-top: auto; margin-bottom: auto;'>
                            <p class='card-text'><small class='text-muted'><a href='${article.project_url}'>${article.project}</a> | ${Number(article.created_at).to_date()}</small></p>
                          </div>

                          <div class='col-6 text-center'>
                              <a href='${article.url}' target='_blank' class='btn btn-primary card-text'>Read...</a>
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
      <div class='accordion mx-auto col-lg-9' id='accordionArticles'>
        ${l_acc_item.call()}
      </div>
    `}`;
    this.innerHTML = template
  };

  init_spinner() {
    this.innerHTML = "<elm-spinner></elm-spinner>"
  }
}