package fr.omatech.ordernow.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link fr.omatech.ordernow.domain.Restaurant} entity.
 */
public class RestaurantDTO implements Serializable {
    
    private Long id;

    private String nom;

    private String tel;

    private String email;

    private String description;


    private Long addressId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RestaurantDTO restaurantDTO = (RestaurantDTO) o;
        if (restaurantDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), restaurantDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RestaurantDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", tel='" + getTel() + "'" +
            ", email='" + getEmail() + "'" +
            ", description='" + getDescription() + "'" +
            ", addressId=" + getAddressId() +
            "}";
    }
}
