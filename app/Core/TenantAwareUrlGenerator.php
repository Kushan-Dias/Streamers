<?php

namespace App\Core;

use DateTimeInterface;
use Spatie\MediaLibrary\Support\UrlGenerator\BaseUrlGenerator;

class TenantAwareUrlGenerator extends BaseUrlGenerator
{
  public function getUrl(): string
  {
    if (tenant('id') !== null) {
      $url = tenant_asset($this->getPathRelativeToRoot());
    } else {
      $url = $this->getDisk()->url($this->getPathRelativeToRoot());
    }

    return $this->versionUrl($url);
  }

  public function getPath(): string
  {
    // TODO: Implement getPath() method.
  }

  public function getTemporaryUrl(DateTimeInterface $expiration, array $options = []): string
  {
    // TODO: Implement getTemporaryUrl() method.
  }

  public function getResponsiveImagesDirectoryUrl(): string
  {
    // TODO: Implement getResponsiveImagesDirectoryUrl() method.
  }
}
