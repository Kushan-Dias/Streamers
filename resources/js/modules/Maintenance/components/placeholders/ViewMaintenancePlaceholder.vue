<template>
  <CRow class="mb-3">
    <CCol :md="8">
      <CCard>
        <CCardBody v-c-placeholder="{animation: 'glow'}">
          <CRow>
            <CCol :md="8">
              <CPlaceholder color="secondary" :xs="6"/>
            </CCol>
            <CCol :md="4" class="d-flex flex-column justify-content-between align-items-end">
              <CPlaceholder color="secondary" :xs="6"/>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CPlaceholder color="secondary" :xs="8" size="sm"/>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CPlaceholder color="secondary" :xs="6" size="xs"/>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="4">
      <CCard class="h-100">
        <CCardBody v-c-placeholder="{animation: 'glow'}">
          <CRow>
            <CCol :md="8">
              <CPlaceholder color="secondary" :xs="6"/>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CPlaceholder color="secondary" :xs="8" size="xs"/>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CPlaceholder color="secondary" :xs="6" size="xs"/>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <CRow>
    <CCol :md="8">
      <CRow class="mb-3">
        <CCol>
          <CCard>
            <CCardBody v-c-placeholder="{animation: 'glow'}">
              <CRow class="mb-3">
                <CCol>
                  <CPlaceholder color="secondary" :xs="6"/>
                  <CPlaceholder color="secondary" :xs="8" size="xs"/>
                </CCol>
                <CCol :xs="1">
                  <CButton
                    v-c-placeholder="{xs: 12}"
                    size="sm"
                    color="secondary"
                    class="float-end ml-2"
                  >
                  </CButton>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CCardImage component="svg" orientation="top" width="100%" height="380"
                              xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#aeb1b5"></rect>
                  </CCardImage>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow class="mb-3">
        <CCol>
          <CCard>
            <CCardBody v-c-placeholder="{animation: 'glow'}">
              <CRow>
                <CCol>
                  <CPlaceholder color="secondary" :xs="4"/>
                  <CPlaceholder color="secondary" :xs="12" size="sm"/>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CPlaceholder color="secondary" :xs="12" size="sm"/>
                </CCol>
                <CCol>
                  <CPlaceholder color="secondary" :xs="12" size="sm"/>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow class="mb-3">
        <CCol>
          <CCard>
            <CCardBody v-c-placeholder="{animation: 'glow'}">
              <CRow>
                <CCol>
                  <CPlaceholder color="secondary" :xs="7"/>
                  <CPlaceholder color="secondary" :xs="6" size="sm"/>
                </CCol>
                <CCol :xs="2">
                  <CButton
                    v-c-placeholder="{xs: 12}"
                    size="sm"
                    color="secondary"
                    class="float-end ml-2"
                  >
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCol>
    <CCol :md="4">
      <CRow>
        <CCol>
          <CCard>
            <CCardBody v-c-placeholder="{animation: 'glow'}">
              <CRow class="mb-3">
                <CCol>
                  <CPlaceholder color="secondary" :xs="5"/>
                </CCol>
              </CRow>
              <CRow class="ms-2 mb-3">
                <CCol>
                  <CPlaceholder color="secondary" :xs="7" size="sm"/>
                  <CPlaceholder color="secondary" :xs="6" size="xs"/>
                  <CPlaceholder color="secondary" :xs="8" size="xs"/>
                </CCol>
              </CRow>
              <CRow class="ms-2 mb-3">
                <CCol>
                  <CPlaceholder color="secondary" :xs="7" size="sm"/>
                  <CPlaceholder color="secondary" :xs="6" size="xs"/>
                  <CPlaceholder color="secondary" :xs="8" size="xs"/>
                </CCol>
              </CRow>
              <CRow class="ms-2 ">
                <CCol>
                  <CPlaceholder color="secondary" :xs="7" size="sm"/>
                  <CPlaceholder color="secondary" :xs="6" size="xs"/>
                  <CPlaceholder color="secondary" :xs="8" size="xs"/>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: "ViewMaintenancePlaceholder"
};
</script>

<style scoped>

</style>
