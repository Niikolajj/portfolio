import type { Schema, Struct } from '@strapi/strapi';

export interface BasicTextElement extends Struct.ComponentSchema {
  collectionName: 'components_basic_text_elements';
  info: {
    displayName: 'textElement';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface PortfolioContactMe extends Struct.ComponentSchema {
  collectionName: 'components_portfolio_contact_mes';
  info: {
    description: '';
    displayName: 'ContactMe';
    icon: 'at';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    content: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    title: Schema.Attribute.String;
  };
}

export interface PortfolioHeader extends Struct.ComponentSchema {
  collectionName: 'components_portfolio_headers';
  info: {
    description: '';
    displayName: 'Header';
    icon: 'address-card';
  };
  attributes: {
    highlight: Schema.Attribute.String;
    text: Schema.Attribute.RichText;
  };
}

export interface PortfolioNowPlaying extends Struct.ComponentSchema {
  collectionName: 'components_portfolio_now_playings';
  info: {
    displayName: 'nowPlaying';
    icon: 'music';
  };
  attributes: {
    fallbackUrl: Schema.Attribute.String & Schema.Attribute.Required;
    lastFMUsername: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PortfolioTagList extends Struct.ComponentSchema {
  collectionName: 'components_portfolio_tag_lists';
  info: {
    description: '';
    displayName: 'tagList';
    icon: 'indent';
  };
  attributes: {
    leftList: Schema.Attribute.Relation<'oneToMany', 'api::tag.tag'>;
    leftTitle: Schema.Attribute.String;
    middleList: Schema.Attribute.Relation<'oneToMany', 'api::tag.tag'>;
    middleTitle: Schema.Attribute.String;
    rightList: Schema.Attribute.Relation<'oneToMany', 'api::tag.tag'>;
    rightTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'basic.text-element': BasicTextElement;
      'portfolio.contact-me': PortfolioContactMe;
      'portfolio.header': PortfolioHeader;
      'portfolio.now-playing': PortfolioNowPlaying;
      'portfolio.tag-list': PortfolioTagList;
    }
  }
}
