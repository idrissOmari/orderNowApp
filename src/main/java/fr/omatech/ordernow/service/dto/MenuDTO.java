package fr.omatech.ordernow.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link fr.omatech.ordernow.domain.Menu} entity.
 */
public class MenuDTO implements Serializable {
    
    private Long id;

    private String tittle;


    private Long restaurantId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTittle() {
        return tittle;
    }

    public void setTittle(String tittle) {
        this.tittle = tittle;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MenuDTO menuDTO = (MenuDTO) o;
        if (menuDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), menuDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MenuDTO{" +
            "id=" + getId() +
            ", tittle='" + getTittle() + "'" +
            ", restaurantId=" + getRestaurantId() +
            "}";
    }
}
