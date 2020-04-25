package fr.omatech.ordernow.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link fr.omatech.ordernow.domain.Address} entity.
 */
public class AddressDTO implements Serializable {
    
    private Long id;

    private String adresse1;

    private String adresse2;

    private Integer postalCode;

    private String city;

    private String country;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdresse1() {
        return adresse1;
    }

    public void setAdresse1(String adresse1) {
        this.adresse1 = adresse1;
    }

    public String getAdresse2() {
        return adresse2;
    }

    public void setAdresse2(String adresse2) {
        this.adresse2 = adresse2;
    }

    public Integer getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(Integer postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AddressDTO addressDTO = (AddressDTO) o;
        if (addressDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), addressDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AddressDTO{" +
            "id=" + getId() +
            ", adresse1='" + getAdresse1() + "'" +
            ", adresse2='" + getAdresse2() + "'" +
            ", postalCode=" + getPostalCode() +
            ", city='" + getCity() + "'" +
            ", country='" + getCountry() + "'" +
            "}";
    }
}
