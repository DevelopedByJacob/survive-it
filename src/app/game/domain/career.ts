export type CareerArea = 'development' | 'qa' | 'product' | 'data' | 'devops' | 'security';

export type SpecializationByArea = {
  development: 'frontend' | 'backend' | 'fullstack' | 'mobile';
  qa: 'manual' | 'automation' | 'performance';
  product: 'product-owner' | 'product-manager';
  data: 'data-engineering' | 'data-analysis' | 'machine-learning';
  devops: 'cloud' | 'platform' | 'sre';
  security: 'appsec' | 'pentesting' | 'soc';
};

export type CareerState = {
  [Area in CareerArea]: {
    area: Area;
    specialization?: SpecializationByArea[Area];
  };
}[CareerArea];
